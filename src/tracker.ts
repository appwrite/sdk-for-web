import { Client } from './client';
import { Analytics } from './services/analytics';
import { Tracking } from './services/analytics-tracking';

/**
 * Self-initializing tracker. Loaded from a script tag it reads that tag's
 * `data-*` attributes, wires `Client` -> `Analytics` -> `Tracking` and calls
 * `start()`, so a page gets pageviews, outbound links, scroll depth and
 * engagement time without writing any JavaScript:
 *
 * ```html
 * <script defer src="<CDN>/tracker.js"
 *         data-endpoint="https://<REGION>.cloud.appwrite.io/v1"
 *         data-project="<PROJECT_ID>"
 *         data-property="<PROPERTY_ID>"></script>
 * ```
 *
 * Optional attributes: `data-respect-dnt="false"` tracks regardless of
 * `navigator.doNotTrack`, `data-track-downloads="true"` adds the download
 * tracking `start()` leaves opt-in. The started instance is published on
 * `window.__appwriteTracker` for custom events, and `startTracking()`
 * on the global `Appwrite` object wires up a second property by hand.
 */

export type TrackerConfig = {
    endpoint: string;
    project: string;
    property: string;
    /** Defaults to true, as in `Tracking`. */
    respectDoNotTrack?: boolean;
    /** Defaults to false, as in `Tracking.start()`. */
    trackDownloads?: boolean;
};

type TrackerWindow = Window & { __appwriteTracker?: Tracking };

/**
 * Wire up and start tracking by hand, with the defaults the script tag uses.
 */
export function startTracking(config: TrackerConfig): Tracking {
    const client = new Client()
        .setEndpoint(config.endpoint)
        .setProject(config.project);
    const tracking = new Tracking(new Analytics(client), config.property, {
        respectDoNotTrack: config.respectDoNotTrack,
    });
    tracking.start();
    if (config.trackDownloads) {
        tracking.enableAutoDownloadTracking();
    }
    return tracking;
}

function autoStart(data: DOMStringMap): void {
    const { endpoint, project, property } = data;
    if (!endpoint || !project || !property) {
        const missing = Object.entries({ endpoint, project, property })
            .filter(([, value]) => !value)
            .map(([name]) => `data-${name}`);
        console.warn(`Tracker: script tag is missing ${missing.join(', ')}`);
        return;
    }

    const scope = window as TrackerWindow;
    if (scope.__appwriteTracker) {
        console.warn('Tracker: already started, ignoring this script tag');
        return;
    }

    // Tracking is never worth breaking the host page over, and the attributes
    // reach `setEndpoint`/`setProject`, which throw on anything invalid.
    try {
        scope.__appwriteTracker = startTracking({
            endpoint,
            project,
            property,
            respectDoNotTrack: data.respectDnt !== 'false',
            trackDownloads: data.trackDownloads === 'true',
        });
    } catch (error) {
        console.warn('Tracker: failed to start', error);
    }
}

// `document.currentScript` only answers while the script is running, so it is
// read here rather than from inside a function called later.
const ownScript =
    typeof document === 'undefined' ? null : document.currentScript;

if (ownScript) {
    autoStart(ownScript.dataset);
}
