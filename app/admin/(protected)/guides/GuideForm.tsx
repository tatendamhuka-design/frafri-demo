"use client";

import Link from "next/link";
import { createGuide } from "../../../../lib/actions/guides";

type DestinationOption = { id: string; name: string };

type GuideData = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  destinationId: string | null;
};

export default function GuideForm({
  destinations,
  initial,
  action,
}: {
  destinations: DestinationOption[];
  initial?: GuideData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const isEdit = Boolean(initial);

  async function handleSubmit(formData: FormData) {
    if (isEdit && action) {
      await action(formData);
    } else {
      await createGuide(formData);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div
        className="rounded-md p-5"
        style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
          Details
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={initial?.title} required full />
          <Field label="Slug (URL)" name="slug" defaultValue={initial?.slug} placeholder="auto-generated if empty" />
          <Field label="Category" name="category" defaultValue={initial?.category || "Travel Guide"} required />
          <Field label="Read time" name="readTime" defaultValue={initial?.readTime || "5 min read"} />
          <Field label="Image URL" name="image" defaultValue={initial?.image} placeholder="https://..." required full />
        </div>

        <div className="mt-4">
          <Label>Excerpt</Label>
          <textarea
            name="excerpt"
            defaultValue={initial?.excerpt}
            rows={2}
            required
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid #e8eaed",
              borderRadius: "var(--radius-md)",
              color: "#0a0a0a",
            }}
          />
        </div>

        <div className="mt-4">
          <Label>Full content</Label>
          <textarea
            name="content"
            defaultValue={initial?.content}
            rows={12}
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid #e8eaed",
              borderRadius: "var(--radius-md)",
              color: "#0a0a0a",
              fontFamily: "ui-monospace, monospace",
            }}
            placeholder="Write your guide here. Plain text for now — rich formatting comes in the paid build."
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Linked destination (optional)</Label>
            <select
              name="destinationId"
              defaultValue={initial?.destinationId ?? ""}
              className="w-full px-3 py-2 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid #e8eaed",
                borderRadius: "var(--radius-md)",
                color: "#0a0a0a",
              }}
            >
              <option value="">None</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} />
              Published
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-accent text-sm">
          {isEdit ? "Save changes" : "Create guide"}
        </button>
        <Link
          href="/admin/guides"
          className="text-sm font-semibold"
          style={{ color: "#6b7280" }}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 text-sm outline-none"
        style={{
          backgroundColor: "var(--color-white)",
          border: "1px solid #e8eaed",
          borderRadius: "var(--radius-md)",
          color: "#0a0a0a",
        }}
      />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#6b7280" }}
    >
      {children}
    </span>
  );
}