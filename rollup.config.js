import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const external = Object.keys(pkg.dependencies ?? {});

export default [
    {
        input: "src/index.ts",
        external,
        plugins: [typescript()],
        output: [
            {
                format: "cjs",
                file: pkg.main,
                esModule: false,
                sourcemap: true,
            },
            {
                format: "es",
                file: pkg.module,
                sourcemap: true,
            },
        ],
    },
    {
        input: "src/index.ts",
        plugins: [
            resolve({ browser: true }),
            commonjs(),
            typescript()
        ],
        output: [
            {
                format: "iife",
                file: pkg.jsdelivr,
                name: "Appwrite",
                extend: true,
            },
        ],
    }
];
