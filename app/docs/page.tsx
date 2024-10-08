import Markdoc from "@markdoc/markdoc";
import React from "react";
import fs from "fs";
import path from "path";
import { components } from "@/components/Markdoc";

export default function DocsPage() {
  const docsDir = path.join(process.cwd(), "app", "docs");
  const content = fs.readFileSync(path.join(docsDir, "index.md"), "utf8");

  const ast = Markdoc.parse(content);
  const rendered = Markdoc.transform(ast);

  return (
    <div className="prose max-w-none">
      {Markdoc.renderers.react(rendered, React, { components })}
      {components.ReturnButton()}
    </div>
  );
}
