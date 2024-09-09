import React from "react";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/docs" className="text-blue-600 hover:underline">
              Introduction
            </Link>
          </li>
          <li>
            <Link href="/docs/usage" className="text-blue-600 hover:underline">
              Usage
            </Link>
          </li>
          <li>
            <Link
              href="/docs/dependencies"
              className="text-blue-600 hover:underline"
            >
              Dependencies
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
