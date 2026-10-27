import { existsSync, readdirSync, readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';

const external = Object.keys(pkg.dependencies ?? {});

// The Push service uses mqtt.js, which references Node built-ins
// (buffer/process/stream/…); polyfill them for the browser bundles.
const browser = (options) => [
    nodePolyfills(),
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    typescript(options),
];

const minify = (ecma, options = {}) =>
    terser({
        ecma,
        format: { comments: false },
        compress: { passes: 3 },
        ...options,
    });

const iife = (file, options, ecma, input = 'src/index.ts') => ({
    input,
    plugins: browser(options),
    output: [
        {
            format: 'iife',
            file,
            name: 'Appwrite',
            extend: true,
            // A script tag has no module loader, so the lazy mqtt.js import is inlined here.
            inlineDynamicImports: true,
            sourcemap: true,
            plugins: [minify(ecma)],
        },
    ],
});

const libs = [
    {
        input: 'src/index.ts',
        external,
        plugins: [typescript({ outDir: 'dist' })],
        output: [
            {
                format: 'cjs',
                file: pkg.main,
                esModule: false,
                sourcemap: true,
            },
            {
                format: 'es',
                file: pkg.module,
                sourcemap: true,
            },
        ],
    },
    iife(pkg.jsdelivr, { outDir: 'dist' }, 2015),
];

const entries = (dir, prefix = '') =>
    existsSync(dir)
        ? readdirSync(dir)
              .filter((file) => file.endsWith('.ts'))
              .map((file) => [prefix + file.slice(0, -3), `${dir}/${file}`])
        : [];

const input = {};
for (const [name, file] of [
    // `tracker` is not an ES entry: a plain script tag loads it, so it ships
    // as one self-contained file built by its own rule.
    ...entries('src').filter(
        ([name]) => name !== 'models' && name !== 'tracker',
    ),
    ...entries('src/services'),
    ...entries('src/enums', 'enums/'),
]) {
    if (name in input) {
        throw new Error(`${file} and ${input[name]} both build ${name}.js`);
    }
    input[name] = file;
}

const modern = { outDir: 'dist/cdn', target: 'ES2020' };

const cdn = [
    {
        input,
        plugins: browser(modern),
        output: {
            format: 'es',
            dir: 'dist/cdn',
            entryFileNames: '[name].js',
            chunkFileNames: 'chunks/[name]-[hash].js',
            sourcemap: true,
            plugins: [minify(2020, { module: true })],
        },
    },
    iife('dist/cdn/sdk.min.js', modern, 2020),
    // Every round trip before this one delays the first pageview, so the
    // tracker inlines its dependencies instead of importing them.
    iife('dist/cdn/tracker.js', modern, 2020, 'src/tracker.ts'),
];

export default process.env.CDN ? cdn : libs;
