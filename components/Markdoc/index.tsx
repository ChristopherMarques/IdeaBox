import React from "react";
import Link from "next/link";

export const components = {
  Heading: ({ level, children }: { level: number; children: React.ReactNode }) => {
    const Component = `h${level}` as keyof JSX.IntrinsicElements;
    return <Component className="mt-6 mb-4">{children}</Component>;
  },
  Paragraph: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-blue-600 hover:underline">
      {children}
    </Link>
  ),
  Code: ({ children }: { children: string }) => (
    <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>
  ),
  CodeBlock: ({ children, language }: { children: string; language: string }) => (
    <pre className="bg-gray-100 rounded p-4 overflow-x-auto">
      <code className={`language-${language}`}>{children}</code>
    </pre>
  ),
};
