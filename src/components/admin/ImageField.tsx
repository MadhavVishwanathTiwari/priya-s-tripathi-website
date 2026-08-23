"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Field, TextInput } from "@/components/admin/fields";
import { browserClient } from "@/lib/supabase/browser";
import { MEDIA_BUCKET } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";

/**
 * Picks an image, shrinks it in the browser, and puts it straight into Supabase
 * Storage with the editor's own session. The row only ever holds the object
 * path, which the form carries in a hidden input.
 *
 * Uploading before the form is saved means an abandoned edit can leave a file
 * behind. That is the cheaper trade: the alternative is posting several
 * megabytes through a server action every time a form is submitted. Replacing
 * or deleting a record does clean up the object it referenced.
 */

const MAX_WIDTH = 1600;

async function downscaleToWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot resize images.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("The image could not be read.")),
      "image/webp",
      0.85,
    );
  });
}

export function ImageField({
  label,
  hint,
  folder,
  pathName,
  altName,
  initialPath,
  initialAlt,
  altLabel,
  altError,
  shape = "wide",
}: {
  label: string;
  hint?: string;
  /** Prefix inside the bucket, e.g. "covers". */
  folder: string;
  pathName: string;
  altName: string;
  initialPath: string | null;
  initialAlt: string | null;
  altLabel: string;
  altError?: string;
  shape?: "wide" | "round";
}) {
  const [path, setPath] = useState(initialPath ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = browserClient();
  const previewUrl = path
    ? supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
    : null;

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);

    try {
      const blob = await downscaleToWebp(file);
      const objectPath = `${folder}/${crypto.randomUUID()}.webp`;

      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(objectPath, blob, { contentType: "image/webp" });

      if (uploadError) throw new Error(uploadError.message);
      setPath(objectPath);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "The upload did not finish.",
      );
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.68rem] tracked text-ink-soft">{label}</p>

      <div className="flex items-start gap-4">
        <div
          className={cn(
            "relative shrink-0 overflow-hidden border border-line bg-cream-deep",
            shape === "round" ? "h-20 w-20 rounded-full" : "h-24 w-40 rounded-sm",
          )}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt=""
              fill
              sizes="160px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="flex h-full items-center justify-center text-[0.7rem] text-ink-muted">
              None
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
            className="max-w-full text-[0.8rem] text-ink-soft file:mr-3 file:rounded-full file:border file:border-gold/45 file:bg-transparent file:px-4 file:py-2 file:text-[0.68rem] file:tracked file:text-gold-deep hover:file:bg-peach-soft/40"
          />

          <p className="text-[0.78rem] text-ink-muted">
            {busy
              ? "Uploading."
              : (hint ??
                "Any photo is fine. It is shrunk and converted here before it is sent.")}
          </p>

          {path ? (
            <button
              type="button"
              onClick={() => setPath("")}
              className="self-start text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
            >
              Remove this image
            </button>
          ) : null}

          {error ? (
            <p role="alert" className="text-[0.78rem] text-peach-deep">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      <input type="hidden" name={pathName} value={path} readOnly />
      <input
        type="hidden"
        name={`previous_${pathName}`}
        value={initialPath ?? ""}
        readOnly
      />

      {path ? (
        <Field
          label={altLabel}
          htmlFor={altName}
          error={altError}
          hint="One short sentence. Read aloud to anyone using a screen reader."
        >
          <TextInput
            id={altName}
            name={altName}
            defaultValue={initialAlt ?? ""}
            maxLength={160}
          />
        </Field>
      ) : null}
    </div>
  );
}
