"use client";

import { useState } from "react";
import Link from "next/link";
import { createPackage } from "../../../../lib/actions/packages";

type Destination = { id: string; name: string };

type PackageData = {
  id?: string;
  slug: string;
  title: string;
  duration: string;
  groupSize: string;
  location: string;
  priceFrom: number;
  image: string;
  summary: string;
  highlights: string[];
  featured: boolean;
  published: boolean;
  destinationIds: string[];
};

export default function PackageForm({
  destinations,
  initial,
  action,
}: {
  destinations: Destination[];
  initial?: PackageData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const isEdit = Boolean(initial);

  const [highlightsText, setHighlightsText] = useState(
    initial?.highlights.join("\n") ?? ""
  );
  const [selectedDests, setSelectedDests] = useState<Set<string>>(
    new Set(initial?.destinationIds ?? [])
  );

  async function handleSubmit(formData: FormData) {
    formData.set("highlights", highlightsText);
    formData.delete("destinationIds");
    selectedDests.forEach((id) => formData.append("destinationIds", id));

    if (isEdit && action) {
      await action(formData);
    } else {
      await createPackage(formData);
    }
  }

  function toggleDest(id: string) {
    const next = new Set(selectedDests);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedDests(next);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div
        className="rounded-md p-5"
        style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
          Basics
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={initial?.title} required full />
          <Field label="Slug (URL)" name="slug" defaultValue={initial?.slug} placeholder="auto-generated if empty" />
          <Field label="Duration" name="duration" defaultValue={initial?.duration} placeholder="e.g. 6 Days" required />
          <Field label="Group size" name="groupSize" defaultValue={initial?.groupSize} placeholder="e.g. Private" required />
          <Field label="Location" name="location" defaultValue={initial?.location} placeholder="e.g. Tanzania" required />
          <Field label="Price from (USD)" name="priceFrom" type="number" defaultValue={String(initial?.priceFrom ?? "")} required />
          <Field label="Image URL" name="image" defaultValue={initial?.image} placeholder="https://..." required full />
        </div>

        <div className="mt-4">
          <Label>Summary</Label>
          <textarea
            name="summary"
            defaultValue={initial?.summary}
            rows={3}
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
          <Label>Highlights (one per line)</Label>
          <textarea
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 text-sm outline-none"
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid #e8eaed",
              borderRadius: "var(--radius-md)",
              color: "#0a0a0a",
            }}
            placeholder={"Tarangire National Park\nNgorongoro Crater\nSerengeti National Park"}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured} />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div
        className="rounded-md p-5"
        style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
      >
        <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
          Destinations
        </h2>
        <p className="mt-1 text-xs" style={{ color: "#6b7280" }}>
          Select which destinations this package includes.
        </p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <label key={d.id} className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selectedDests.has(d.id)}
                onChange={() => toggleDest(d.id)}
              />
              {d.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-accent text-sm">
          {isEdit ? "Save changes" : "Create package"}
        </button>
        <Link
          href="/admin/packages"
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