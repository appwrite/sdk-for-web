import type { Analytics } from './analytics';

/**
 * Auto-tracking helpers for the generated `Analytics` service: pageviews,
 * outbound links, downloads, scroll depth and active engagement, all sent
 * through `Analytics.createEvent`.
 *
 * ```ts
 * const tracking = new Tracking(new Analytics(client), '<PROPERTY_ID>');
 * tracking.start();
 * ```
 *
 * All helpers respect `navigator.doNotTrack === '1'` by default; opt out with
 * `respectDoNotTrack: false` in the constructor options.
 *
 * Engagement time follows Plausible's model: rather than one total at unload,
 * a delta is emitted at every natural checkpoint of the visit (tab hidden, SPA
 * route change, unload). See `enableAutoEngagementTime` for details.
 *
 * Auto-emitted event names follow `snake_case` + lowercase (`pageview`,
 * `outbound_link`, `file_download`, `screen_view`, etc.). Any prop keys use
 * camelCase to match the endpoint's parameter naming. Callers can pass any
 * custom event name; the auto-track methods only own the events they emit
 * themselves.
 */

export type TrackingEventOptions = {
    props?: Record<string, unknown>;
    url?: string; // defaults to the current page URL
    referrer?: string;
    scrollDepth?: number; // 0-100 percentage
    engagementTime?: number; // seconds since the previous flush
};

export type TrackingOptions = {
    /**
     * When true (default) the tracker becomes a no-op if `navigator.doNotTrack`
     * is set to `'1'`. Set to false to always fire regardless of the DNT signal.
     */
    respectDoNotTrack?: boolean;
};

export type OutboundTrackingOptions = {
    /**
     * When true, links pointing at the current host's subdomains are treated
     * as outbound. Defaults to false (subdomains are same-origin for tracking).
     */
    includeSubdomains?: boolean;
};

export type DownloadTrackingOptions = {
    /**
     * File extensions (without the leading dot) that mark an anchor as a
     * download. Defaults cover the common set.
     */
    extensions?: string[];
};

const DEFAULT_DOWNLOAD_EXTENSIONS = [
    'pdf',
    'zip',
    'rar',
    '7z',
    'tar',
    'gz',
    'csv',
    'tsv',
    'xls',
    'xlsx',
    'doc',
    'docx',
    'ppt',
    'pptx',
    'dmg',
    'exe',
    'msi',
    'pkg',
    'deb',
    'rpm',
    'apk',
    'mp3',
    'wav',
    'flac',
    'mp4',
    'mov',
    'avi',
    'mkv',
    'webm',
];

/**
 * Two-part public suffixes common enough to matter for outbound-link detection.
 * See `rootDomain()` for why this is a short list rather than the Public Suffix
 * List.
 */
const MULTI_PART_SUFFIXES = new Set([
    'co.uk',
    'org.uk',
    'ac.uk',
    'gov.uk',
    'me.uk',
    'net.uk',
    'sch.uk',
    'co.jp',
    'ne.jp',
    'or.jp',
    'ac.jp',
    'go.jp',
    'com.au',
    'net.au',
    'org.au',
    'edu.au',
    'gov.au',
    'com.br',
    'net.br',
    'org.br',
    'com.cn',
    'net.cn',
    'org.cn',
    'gov.cn',
    'co.in',
    'net.in',
    'org.in',
    'co.nz',
    'net.nz',
    'org.nz',
    'co.za',
    'org.za',
    'com.mx',
    'com.ar',
    'com.co',
    'com.pe',
    'com.tr',
    'com.tw',
    'com.sg',
    'com.hk',
    'com.my',
    'com.ph',
    'com.vn',
    'co.kr',
    'co.il',
    'co.id',
    'co.th',
    'com.ua',
    'com.pl',
    'com.es',
]);

const SCROLL_DEPTH_THROTTLE_MS = 200;

type Cleanup = () => void;

export class Tracking {
    private readonly analytics: Analytics;
    private readonly propertyId: string;
    private readonly respectDoNotTrack: boolean;

    private pageviewCleanups: Cleanup[] = [];
    private outboundCleanup?: Cleanup;
    private downloadCleanup?: Cleanup;
    private scrollCleanups: Cleanup[] = [];
    private engagementCleanups: Cleanup[] = [];

    private currentPath?: string;
    private maxScrollDepth = 0;
    private scrollTicking = false;
    private lastScrollReport = 0;

    private engagementStart = 0;
    private engagementAccumulatedMs = 0;
    private engagementActive = false;

    /**
     * @param analytics - The generated `Analytics` service events are sent through.
     * @param propertyId - Analytics property every event is recorded against.
     */
    constructor(
        analytics: Analytics,
        propertyId: string,
        options: TrackingOptions = {},
    ) {
        this.analytics = analytics;
        this.propertyId = propertyId;
        this.respectDoNotTrack = options.respectDoNotTrack !== false;
    }

    /**
     * Start the default auto-tracking set: pageviews, outbound links, scroll
     * depth and active engagement time. Downloads are opt-in via
     * `enableAutoDownloadTracking()` because the extension list is
     * application-specific.
     */
    public start(): void {
        this.enableAutoPageviews();
        this.enableAutoOutboundTracking();
        this.enableAutoScrollDepth();
        this.enableAutoEngagementTime();
    }

    /**
     * Track an event manually. Respects the DNT setting and swallows request
     * failures so tracking never surfaces errors to the host page.
     */
    public track(name: string, options: TrackingEventOptions = {}): void {
        if (!this.canTrack()) {
            return;
        }
        try {
            // Missing required params throw synchronously rather than rejecting.
            this.analytics
                .createEvent({
                    propertyId: this.propertyId,
                    name,
                    url: options.url ?? this.currentPageUrl(),
                    referrer: options.referrer,
                    scrollDepth: options.scrollDepth,
                    engagementTime: options.engagementTime,
                    // The endpoint takes props as a flat alternating key/value list.
                    props: options.props
                        ? Object.entries(options.props).flatMap(
                              ([key, value]) => [key, String(value)],
                          )
                        : undefined,
                })
                .catch((error) => {
                    console.warn('Tracking: failed to send event', error);
                });
        } catch (error) {
            console.warn('Tracking: failed to send event', error);
        }
    }

    /**
     * Convenience wrapper for pageview-shaped events.
     */
    public pageview(url?: string, referrer?: string): void {
        this.track('pageview', {
            url: url ?? this.currentPageUrl(),
            referrer:
                referrer ??
                (typeof document !== 'undefined'
                    ? document.referrer
                    : undefined),
        });
    }

    /**
     * Enable SPA-aware pageview tracking. Fires an initial pageview on
     * enable, then again on every `pushState`, `replaceState`, `popstate`
     * or hashchange. Idempotent — repeat calls no-op.
     */
    public enableAutoPageviews(): void {
        if (this.pageviewCleanups.length > 0) {
            return;
        }
        if (typeof window === 'undefined' || typeof history === 'undefined') {
            return;
        }

        this.currentPath = this.currentPageUrl();
        this.pageview();

        const handleNavigation = (): void => {
            const nextPath = this.currentPageUrl();
            if (nextPath === this.currentPath) {
                return;
            }
            const previous = this.currentPath;
            this.currentPath = nextPath;
            this.flushScrollDepth(previous);
            this.flushEngagement(previous);
            this.pageview(nextPath);
            // flushEngagement no longer auto-restarts the timer (see its
            // implementation note re: bfcache). SPA navigation stays on the
            // same document, so restart engagement tracking for the new
            // route as long as the tab is visible.
            if (
                this.engagementCleanups.length > 0 &&
                (typeof document === 'undefined' ||
                    document.visibilityState !== 'hidden')
            ) {
                this.startEngagement();
            }
        };

        const originalPushState = history.pushState.bind(history);
        const originalReplaceState = history.replaceState.bind(history);

        // Our wrappers stay reachable after cleanup whenever another library
        // patched on top of ours, so they have to be switchable off rather than
        // merely unreferenced.
        let patchActive = true;

        const patchedPushState = (
            data: unknown,
            unused: string,
            url?: string | URL | null,
        ): void => {
            originalPushState(data, unused, url);
            if (patchActive) {
                handleNavigation();
            }
        };
        const patchedReplaceState = (
            data: unknown,
            unused: string,
            url?: string | URL | null,
        ): void => {
            originalReplaceState(data, unused, url);
            if (patchActive) {
                handleNavigation();
            }
        };

        history.pushState = patchedPushState;
        history.replaceState = patchedReplaceState;

        const popstateHandler = (): void => handleNavigation();
        const hashchangeHandler = (): void => handleNavigation();

        window.addEventListener('popstate', popstateHandler);
        window.addEventListener('hashchange', hashchangeHandler);

        this.pageviewCleanups.push(() => {
            // Only unwind our own patch. A router (Next.js App Router, React
            // Router, …) that patched these after us owns the current value,
            // and assigning our saved reference back would silently throw its
            // wrapper away. In that case ours stays in the chain, which is why
            // `patchActive` exists: the wrapper keeps delegating to the original
            // but stops reporting.
            patchActive = false;

            if (history.pushState === patchedPushState) {
                history.pushState = originalPushState;
            }
            if (history.replaceState === patchedReplaceState) {
                history.replaceState = originalReplaceState;
            }
            window.removeEventListener('popstate', popstateHandler);
            window.removeEventListener('hashchange', hashchangeHandler);
        });
    }

    /**
     * Disable auto-pageview tracking installed by `enableAutoPageviews`.
     * Safe to call when auto-pageviews were never enabled.
     */
    public disableAutoPageviews(): void {
        for (const cleanup of this.pageviewCleanups) {
            cleanup();
        }
        this.pageviewCleanups = [];
    }

    /**
     * Enable click-based outbound link tracking. Detects anchor clicks that
     * navigate to a different origin and fires an `outbound_link` event
     * (with `hostname` and `href` props) before the browser navigates.
     */
    public enableAutoOutboundTracking(
        options: OutboundTrackingOptions = {},
    ): void {
        if (this.outboundCleanup) {
            return;
        }
        if (typeof document === 'undefined') {
            return;
        }

        const includeSubdomains = options.includeSubdomains === true;

        const clickHandler = (event: MouseEvent): void => {
            const anchor = this.findAnchor(event.target);
            if (!anchor || !anchor.href) {
                return;
            }
            const target = this.parseUrl(anchor.href);
            if (!target || !this.isExternal(target, includeSubdomains)) {
                return;
            }
            this.track('outbound_link', {
                url: target.href,
                props: { hostname: target.hostname, href: target.href },
            });
        };

        document.addEventListener('click', clickHandler, { capture: true });
        this.outboundCleanup = () =>
            document.removeEventListener('click', clickHandler, {
                capture: true,
            });
    }

    /**
     * Disable outbound-link tracking installed by `enableAutoOutboundTracking`.
     * Safe to call when auto-outbound was never enabled.
     */
    public disableAutoOutboundTracking(): void {
        if (this.outboundCleanup) {
            this.outboundCleanup();
            this.outboundCleanup = undefined;
        }
    }

    /**
     * Enable click-based download tracking. Detects anchor clicks that point
     * at a file whose extension appears in the configured list and fires a
     * `file_download` event with `filename`, `extension` and `href` props.
     */
    public enableAutoDownloadTracking(
        options: DownloadTrackingOptions = {},
    ): void {
        if (this.downloadCleanup) {
            return;
        }
        if (typeof document === 'undefined') {
            return;
        }

        const extensions = (
            options.extensions ?? DEFAULT_DOWNLOAD_EXTENSIONS
        ).map((ext) => ext.toLowerCase().replace(/^\./, ''));
        const extensionSet = new Set(extensions);

        const clickHandler = (event: MouseEvent): void => {
            const anchor = this.findAnchor(event.target);
            if (!anchor || !anchor.href) {
                return;
            }
            const url = this.parseUrl(anchor.href);
            if (!url) {
                return;
            }
            const filename = url.pathname.split('/').pop() ?? '';
            const extension = filename.includes('.')
                ? filename.split('.').pop()?.toLowerCase()
                : undefined;
            if (!extension || !extensionSet.has(extension)) {
                return;
            }
            this.track('file_download', {
                url: url.href,
                props: { filename, extension, href: url.href },
            });
        };

        document.addEventListener('click', clickHandler, { capture: true });
        this.downloadCleanup = () =>
            document.removeEventListener('click', clickHandler, {
                capture: true,
            });
    }

    /**
     * Disable file-download tracking installed by `enableAutoDownloadTracking`.
     * Safe to call when auto-download was never enabled.
     */
    public disableAutoDownloadTracking(): void {
        if (this.downloadCleanup) {
            this.downloadCleanup();
            this.downloadCleanup = undefined;
        }
    }

    /**
     * Enable passive scroll-depth tracking. Records the maximum percent of the
     * document scrolled and reports it on `beforeunload` and on SPA route
     * changes. Uses a throttled passive listener so it is safe on hot paths.
     */
    public enableAutoScrollDepth(): void {
        if (this.scrollCleanups.length > 0) {
            return;
        }
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        this.maxScrollDepth = 0;
        this.lastScrollReport = 0;

        const scrollHandler = (): void => {
            if (this.scrollTicking) {
                return;
            }
            this.scrollTicking = true;
            window.requestAnimationFrame(() => {
                const now = Date.now();
                if (now - this.lastScrollReport < SCROLL_DEPTH_THROTTLE_MS) {
                    this.scrollTicking = false;
                    return;
                }
                this.lastScrollReport = now;
                const depth = this.computeScrollDepth();
                if (depth > this.maxScrollDepth) {
                    this.maxScrollDepth = depth;
                }
                this.scrollTicking = false;
            });
        };

        const unloadHandler = (): void => {
            this.flushScrollDepth(this.currentPageUrl());
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        window.addEventListener('beforeunload', unloadHandler);
        window.addEventListener('pagehide', unloadHandler);

        this.scrollCleanups.push(() => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('beforeunload', unloadHandler);
            window.removeEventListener('pagehide', unloadHandler);
        });
    }

    /**
     * Disable scroll-depth tracking installed by `enableAutoScrollDepth`. Safe
     * to call when auto-scroll-depth was never enabled. Any accumulated depth
     * for the current page is dropped.
     */
    public disableAutoScrollDepth(): void {
        for (const cleanup of this.scrollCleanups) {
            cleanup();
        }
        this.scrollCleanups = [];
        this.maxScrollDepth = 0;
        this.scrollTicking = false;
        this.lastScrollReport = 0;
    }

    /**
     * Enable active engagement-time tracking. Counts time the tab is visible
     * and uses `visibilitychange` to exclude background time.
     *
     * Delivery follows Plausible's model rather than a single total at the
     * end of the visit: an `engagement_time` event is emitted at every natural
     * checkpoint — the tab going hidden, an SPA route change, and finally
     * `beforeunload`/`pagehide`. Unload is kept only as a best-effort last
     * flush; it is the least reliable moment to send anything (browsers
     * routinely cancel in-flight requests there, and `sendBeacon` cannot set
     * the `X-Appwrite-Project` header the endpoint requires), so it must never
     * be the only delivery.
     *
     * Each event carries a **delta** — the seconds accrued since the previous
     * flush, not a running total — so the values are additive per session and
     * a lost event costs only its own slice.
     *
     * There is deliberately no periodic ping. The cadence is driven by
     * navigation and tab switches, so request volume tracks what the visitor
     * actually does instead of multiplying with time on page.
     */
    public enableAutoEngagementTime(): void {
        if (this.engagementCleanups.length > 0) {
            return;
        }
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        this.engagementAccumulatedMs = 0;
        // Do not start the clock for a tab that is already hidden (prerender,
        // background tab restore); `visibilitychange` starts it when it is
        // actually looked at.
        if (document.visibilityState !== 'hidden') {
            this.startEngagement();
        }

        const visibilityHandler = (): void => {
            if (document.visibilityState === 'hidden') {
                // Flush, don't just pause. The page is still fully alive here,
                // which makes this the most reliable delivery point in the
                // whole visit — and it is the same moment Plausible reports on.
                this.flushEngagement(this.currentPageUrl());
            } else if (document.visibilityState === 'visible') {
                this.startEngagement();
            }
        };

        const unloadHandler = (): void => {
            this.flushEngagement(this.currentPageUrl());
        };

        const pageshowHandler = (event: PageTransitionEvent): void => {
            // When the page is restored from the back-forward cache the
            // engagement timer is in a stopped state (flushEngagement paused
            // it on pagehide and does not auto-restart). Kick off a fresh
            // engagementStart so bfcache dwell time is not billed as
            // engagement.
            if (event.persisted) {
                this.startEngagement();
            }
        };

        document.addEventListener('visibilitychange', visibilityHandler);
        window.addEventListener('beforeunload', unloadHandler);
        window.addEventListener('pagehide', unloadHandler);
        window.addEventListener('pageshow', pageshowHandler);

        this.engagementCleanups.push(() => {
            document.removeEventListener('visibilitychange', visibilityHandler);
            window.removeEventListener('beforeunload', unloadHandler);
            window.removeEventListener('pagehide', unloadHandler);
            window.removeEventListener('pageshow', pageshowHandler);
        });
    }

    /**
     * Disable engagement-time tracking installed by `enableAutoEngagementTime`.
     * Safe to call when auto-engagement was never enabled. Any accumulated
     * engagement time is dropped without being emitted.
     */
    public disableAutoEngagementTime(): void {
        for (const cleanup of this.engagementCleanups) {
            cleanup();
        }
        this.engagementCleanups = [];
        this.engagementActive = false;
        this.engagementAccumulatedMs = 0;
        this.engagementStart = 0;
    }

    private canTrack(): boolean {
        if (!this.respectDoNotTrack) {
            return true;
        }
        if (typeof navigator === 'undefined') {
            return true;
        }
        return navigator.doNotTrack !== '1';
    }

    private currentPageUrl(): string {
        if (typeof window === 'undefined' || !window.location) {
            return '';
        }
        return window.location.href;
    }

    private findAnchor(target: EventTarget | null): HTMLAnchorElement | null {
        let node = target as Node | null;
        while (node) {
            if ((node as HTMLElement).tagName === 'A') {
                return node as HTMLAnchorElement;
            }
            node = (node as Node).parentNode;
        }
        return null;
    }

    private parseUrl(href: string): URL | null {
        try {
            return new URL(href, window.location.href);
        } catch {
            return null;
        }
    }

    private isExternal(target: URL, includeSubdomains: boolean): boolean {
        if (target.protocol !== 'http:' && target.protocol !== 'https:') {
            return false;
        }
        if (target.hostname === window.location.hostname) {
            return false;
        }
        if (includeSubdomains) {
            return true;
        }
        const root = this.rootDomain(window.location.hostname);
        return this.rootDomain(target.hostname) !== root;
    }

    private rootDomain(hostname: string): string {
        const parts = hostname.split('.');
        if (parts.length <= 2) {
            return hostname;
        }
        // Taking the last two labels is wrong wherever the registry sells names
        // one level down: `shop.example.co.uk` and `google.co.uk` both reduce to
        // `co.uk`, so every outbound click between two `.co.uk` sites looks
        // internal and is dropped. Take three labels after a known two-part
        // suffix instead.
        //
        // This is a heuristic, not the Public Suffix List — the full list is
        // orders of magnitude larger than this whole file, and a tracking
        // snippet cannot carry it. Sites on a suffix that is missing here can
        // pass `includeSubdomains: true` to treat every other host as outbound.
        const suffix = parts.slice(-2).join('.');
        if (parts.length > 2 && MULTI_PART_SUFFIXES.has(suffix)) {
            return parts.slice(-3).join('.');
        }
        return suffix;
    }

    private computeScrollDepth(): number {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewport =
            window.innerHeight || document.documentElement.clientHeight;
        const total = document.documentElement.scrollHeight;
        if (total <= viewport) {
            return 100;
        }
        const depth = Math.round(((scrollTop + viewport) / total) * 100);
        return Math.max(0, Math.min(100, depth));
    }

    private flushScrollDepth(url: string | undefined): void {
        if (this.scrollCleanups.length === 0) {
            return;
        }
        if (this.maxScrollDepth <= 0) {
            return;
        }
        this.track('scroll_depth', {
            url,
            scrollDepth: this.maxScrollDepth,
        });
        this.maxScrollDepth = 0;
    }

    private startEngagement(): void {
        if (this.engagementActive) {
            return;
        }
        this.engagementActive = true;
        this.engagementStart = Date.now();
    }

    private pauseEngagement(): void {
        if (!this.engagementActive) {
            return;
        }
        this.engagementActive = false;
        this.engagementAccumulatedMs += Date.now() - this.engagementStart;
    }

    private flushEngagement(url: string | undefined): void {
        if (this.engagementCleanups.length === 0) {
            return;
        }
        this.pauseEngagement();
        // Deltas, not a running total: emit only what accrued since the last
        // flush. `floor` plus keeping the sub-second remainder in the
        // accumulator is what makes repeated flushes safe — nothing is emitted
        // twice, and a visit chopped into many short segments does not lose a
        // fraction of a second to rounding on every one of them.
        const seconds = Math.floor(this.engagementAccumulatedMs / 1000);
        if (seconds > 0) {
            this.engagementAccumulatedMs -= seconds * 1000;
            this.track('engagement_time', {
                url,
                engagementTime: seconds,
            });
        }
        // NOTE: intentionally do NOT call startEngagement() here. flushEngagement
        // runs on `pagehide`, which is also the last hook before the browser
        // may freeze the page into the back-forward cache. Auto-restarting
        // would snapshot engagementStart just before the freeze; the next
        // pauseEngagement (after bfcache restore) would then bill the entire
        // bfcache dwell as active engagement. Restart is driven by explicit
        // resume signals: `pageshow` (with `persisted === true`),
        // `visibilitychange` back to visible, or the SPA navigation flow in
        // `enableAutoPageviews`.
    }
}
