"use server";
import { EntityDataGrid } from "@/components/EntityDataGrid";
import { requireEntity } from "@/lib/entities/helper";

export default async function EntityListPage({
  params,
}: {
  params: { entity: string };
}) {
  // `params` can be a promise-like proxy in Next.js App Router environments.
  // Await it before accessing its properties per Next.js guidance.
  const { entity } = await params;

  const config = requireEntity(entity);
  return <EntityDataGrid entitySlug={config.slug} />;
}
