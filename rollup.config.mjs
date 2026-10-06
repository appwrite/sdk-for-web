import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const external = Object.keys(pkg.dependencies ?? {});

export default [
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
    {
        input: 'src/index.ts',
        plugins: [
            // The Push service uses mqtt.js, which references Node built-ins
            // (buffer/process/stream/…); polyfill them for the browser bundle.
            nodePolyfills(),
            resolve({ browser: true, preferBuiltins: false }),
            commonjs(),
            typescript({ outDir: 'dist' }),
        ],
        output: [
            {
                format: 'iife',
                file: pkg.jsdelivr,
                name: 'Appwrite',
                extend: true,
                // A script tag has no module loader, so the lazy mqtt.js import is inlined here.
                inlineDynamicImports: true,
            },
        ],
    },
];
