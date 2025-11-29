"use client";

import  EntityDataGrid  from "@/components/EntityDataGrid";
import { getEntityConfig } from "@/lib/entities";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { useParams } from "next/navigation";

function Loading() {
  return <div>Đang tải dữ liệu...</div>;
}

export default function EntityListPage() {
  const params = useParams();
  const entityParam = params.entity;

  // Ensure entity is a string
  const entity = Array.isArray(entityParam) ? entityParam[0] : entityParam;

  if (!entity) {
    notFound();
  }

  console.log("EntityListPage entity:", entity);

  const config = getEntityConfig(entity);

  if (!config) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
        <EntityDataGrid config={config} />
    </Suspense>
  );
}
