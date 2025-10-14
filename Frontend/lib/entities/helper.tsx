// lib/entities/helpers.ts
import { notFound } from "next/navigation";
import { getEntityConfig } from "./index";

export function requireEntity(
  slug: string,
) {
  const config = getEntityConfig(slug);

  if (!config) {
    notFound();
  }

  return config;
}
