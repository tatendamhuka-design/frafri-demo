"use client";

import { useState } from "react";
import Link from "next/link";
import { createDestination } from "../../../../lib/actions/destinations";

type DestinationData = {
  id?: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  blurb: string;
  image: string;
  published: boolean;
};

export default function DestinationForm({
  initial,
  action,
}: {
  initial?: DestinationData;
  action?: (formData: FormData) => Promise<void>;
}) {
  const isEdit = Boolean(initial);

  async function handleSubmit(formData: FormData) {
    if (isEdit && action) {
      await action(formData);
    } else {
      await createDestination(formData);
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
          <Field label="Name" name="name" defaultValue={initial?.name} required full />
          <Field label="Slug (URL)" name="slug" defaultValue={initial?.slug} placeholder="auto-generated if empty" />
          <Field label="Region" name="region" defaultValue={initial?.region} placeholder="e.g. Northern Tanzania" required />
          <Field label="Tagline" name="tagline" defaultValue={initial?.tagline} placeholder="One-line summary" required full />
          <Field label="Image URL" name="image" defaultValue={initial?.image} placeholder="https://..." required full />
        </div>

        <div className="mt-4">
          <Label>Description</Label>
          <textarea
            name="blurb"
            defaultValue={initial?.blurb}
            rows={5}
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
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} />
            Published
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-accent text-sm">
          {isEdit ? "Save changes" : "Create destination"}
        </button>
        <Link
          href="/admin/destinations"
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