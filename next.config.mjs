/** @type {import('next').NextConfig} */
import withMarkdoc from "@markdoc/next.js";

const nextConfig = {};

export default withMarkdoc(nextConfig)({
  pageExtensions: ["md", "mdoc", "js", "jsx", "ts", "tsx"],
});
