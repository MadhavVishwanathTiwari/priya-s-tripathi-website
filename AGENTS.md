<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Writing style

No em dashes (—) anywhere the visitor can read: page copy, headings, buttons,
metadata titles and descriptions, alt text and aria labels. This holds for
`src/data/*` copy as well, since that is where the visible text lives.

Use a comma, a colon, brackets, or a second sentence instead. Prefer the second
sentence where the aside is doing real work; a colon where a list or an
explanation follows.

En dashes stay allowed in number ranges (1024–1279). Source comments are not
site copy and are not covered by this rule.
