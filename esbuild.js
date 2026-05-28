/* Bundle the extension entry into a single CommonJS file with all runtime
 * dependencies inlined. VS Code's extension host loads `out/extension.js`
 * directly, so this avoids the npm-workspace hoisting issue (deps for
 * extensions in a workspace land in the root node_modules, where vsce can't
 * find them when packaging the .vsix).
 *
 * `vscode` is the only external — it's provided by the extension host at
 * runtime, not shipped in node_modules.
 */
const esbuild = require("esbuild");

const watch = process.argv.includes("--watch");

const buildOptions = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "out/extension.js",
  platform: "node",
  target: "node18",
  format: "cjs",
  sourcemap: true,
  minify: false,
  external: ["vscode"],
  logLevel: "info",
};

if (watch) {
  esbuild.context(buildOptions).then((ctx) => ctx.watch());
} else {
  esbuild.build(buildOptions).catch(() => process.exit(1));
}
