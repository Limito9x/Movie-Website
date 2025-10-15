import { Suspense } from "react";
import { getEntityConfig } from "@/lib/entities";
import { notFound } from "next/navigation";
import { SafeMountWrapper } from "@/components/SafeMountWrapper";
import EntityNewForm from "@/components/EntityNewForm";

function Loading() {
  return <div>Đang tải...</div>;
}

export default async function NewEntityPage({
  params,
}: {
  params: { entity: string };
}) {
  const { entity } = await params;
  const config = getEntityConfig(entity);
  if (!config) notFound();

  return (
    <Suspense fallback={<Loading />}>
      <SafeMountWrapper>
        <EntityNewForm entitySlug={entity} />
      </SafeMountWrapper>
    </Suspense>
  );
}
