import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify";

export default {
  entry: "index.js",
  dest: "output.js",
  format: "es",
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      presets: ["es2015-rollup"]
    }),
    eslint({
      exclude: [
        "src/styles/**",
      ]
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    (process.env.NODE_ENV === "production" && uglify())
  ],
};