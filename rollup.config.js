// rollup.config.js
const babel = require("@rollup/plugin-babel");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const autoprefixer = require("autoprefixer");
const postcss = require("rollup-plugin-postcss");

module.exports.default = {
  input: "./dist/index.js",
  output: [
    {
      file: "./dist/webexport.js",
      format: "iife",
      sourcemap: true,
      globals: {
        react: "React",
      },
      extend: true,
      name: "@qanary/spring-boot-health-check",
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled" }),
    peerDepsExternal(),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extract: true,
      minimize: true,
    }),
    resolve(),
    commonjs(),
  ],
};
