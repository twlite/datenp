import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entryPoints: ["src/mod.ts"],
    format: ["esm", "cjs"],
    minify: true,
    skipNodeModulesBundle: true,
    sourcemap: true,
    target: "ES2020"
});