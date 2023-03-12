import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import dts from "rollup-plugin-dts";
import path from "path";
export default [
  {
    input: "./index.ts",
    output: [
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: "Track",
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
      },
    ],
    plugins: [resolve(), typescript()],
  },
  {
    input: "./index.ts",
    output: { file: "dist/index.d.ts" },
    plugins: [dts()],
  },
];
