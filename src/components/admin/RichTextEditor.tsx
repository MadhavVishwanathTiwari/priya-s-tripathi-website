"use client";

import {
  EditorContent,
  useEditor,
  type Editor,
  type JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

import type { RichTextDoc } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * The article body editor.
 *
 * Deliberately narrow: only the nodes and marks that `src/lib/content/richtext`
 * knows how to render are enabled, so nothing can be written here that the site
 * would silently drop. The document is mirrored into a hidden input as JSON,
 * which is what the server action reads.
 */

const toolbarButton =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-sm px-2.5 text-[0.78rem] transition-colors duration-200";

function ToolbarButton({
  editor,
  label,
  title,
  isActive,
  onClick,
}: {
  editor: Editor;
  label: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={isActive}
      onClick={() => {
        onClick();
        editor.commands.focus();
      }}
      className={cn(
        toolbarButton,
        isActive
          ? "bg-peach-soft text-gold-deep"
          : "text-ink-soft hover:bg-cream-deep",
      )}
    >
      {label}
    </button>
  );
}

export function RichTextEditor({
  name,
  initialDoc,
  onChange,
}: {
  name: string;
  initialDoc: RichTextDoc;
  /** Lets the form warn about house style as she types. */
  onChange?: (doc: RichTextDoc) => void;
}) {
  const [doc, setDoc] = useState<RichTextDoc>(initialDoc);

  const editor = useEditor({
    // The editor cannot render during SSR; Tiptap wants this said out loud.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // Everything the public renderer does not handle stays switched off.
        codeBlock: false,
        code: false,
        horizontalRule: false,
        strike: false,
        underline: false,
        link: { openOnClick: false, autolink: true },
      }),
    ],
    // Same JSON either way; Tiptap models an absent list as undefined
    // where the database column models it as null.
    content: initialDoc as JSONContent,
    onUpdate: ({ editor: instance }) => {
      const next = instance.getJSON() as RichTextDoc;
      setDoc(next);
      onChange?.(next);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-80 w-full px-4 py-4 text-[0.95rem] leading-[1.8] text-ink outline-none [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-[1.25rem] [&_h2]:text-gold-deep [&_h3]:mt-5 [&_h3]:font-serif [&_h3]:text-[1.05rem] [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-gold/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-gold-deep [&_a]:underline",
      },
    },
  });

  return (
    <div className="rounded-sm border border-line bg-white">
      {editor ? (
        <div className="flex flex-wrap items-center gap-1 border-b border-line-soft px-2 py-2">
          <ToolbarButton
            editor={editor}
            label="Bold"
            title="Bold"
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().toggleBold().run()}
          />
          <ToolbarButton
            editor={editor}
            label="Italic"
            title="Italic"
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().toggleItalic().run()}
          />

          <span className="mx-1 h-5 w-px bg-line-soft" />

          <ToolbarButton
            editor={editor}
            label="Heading"
            title="Section heading"
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
          />
          <ToolbarButton
            editor={editor}
            label="Sub heading"
            title="Smaller heading"
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}
          />

          <span className="mx-1 h-5 w-px bg-line-soft" />

          <ToolbarButton
            editor={editor}
            label="List"
            title="Bulleted list"
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().toggleBulletList().run()}
          />
          <ToolbarButton
            editor={editor}
            label="Numbers"
            title="Numbered list"
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().toggleOrderedList().run()}
          />
          <ToolbarButton
            editor={editor}
            label="Quote"
            title="Pull quote"
            isActive={editor.isActive("blockquote")}
            onClick={() => editor.chain().toggleBlockquote().run()}
          />

          <span className="mx-1 h-5 w-px bg-line-soft" />

          <ToolbarButton
            editor={editor}
            label="Link"
            title="Add or edit a link"
            isActive={editor.isActive("link")}
            onClick={() => {
              const previous = editor.getAttributes("link").href as
                | string
                | undefined;
              const href = window.prompt(
                "Web address for this link. Leave empty to remove it.",
                previous ?? "https://",
              );

              if (href === null) return;
              if (href.trim() === "") {
                editor.chain().extendMarkRange("link").unsetLink().run();
                return;
              }

              editor
                .chain()
                .extendMarkRange("link")
                .setLink({ href: href.trim() })
                .run();
            }}
          />
        </div>
      ) : null}

      <EditorContent editor={editor} />

      <input type="hidden" name={name} value={JSON.stringify(doc)} readOnly />
    </div>
  );
}
