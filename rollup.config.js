// rollup.config.js
const babel = require("@rollup/plugin-babel");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const autoprefixer = require("autoprefixer");
const postcss = require("rollup-plugin-postcss");

const packageJson = require("./package.json");

module.exports.default = {
  input: "./dist/index.js",
  output: [
    {
      file: packageJson.module,
      format: "iife",
      sourcemap: false,
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
      sourceMap: false,
      extract: true,
      minimize: true,
    }),
    resolve(),
    commonjs(),
  ],
};
