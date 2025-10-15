import { EntityDataGrid } from "@/components/EntityDataGrid";
import { SafeMountWrapper } from "@/components/SafeMountWrapper";
import { getEntityConfig } from "@/lib/entities";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Fallback loading component khi đang chờ
function Loading() {
  return <div>Đang tải dữ liệu...</div>;
}

export default async function EntityListPage({
  params,
}: {
  params: { entity: string };
}) {
  // `params` can be a promise-like proxy in Next.js App Router environments.
  // Await it before accessing its properties per Next.js guidance.
  const { entity } = await params;

  // Check if entity exists at the server level before rendering
  const config = getEntityConfig(entity);

  // Instead of passing through to client, handle invalid entity here with notFound()
  if (!config) {
    notFound();
  }

  // We know entity is valid at this point
  // Sử dụng Suspense + SafeMountWrapper để đảm bảo:
  // 1. Component chỉ render khi data sẵn sàng (Suspense)
  // 2. RTK Query hook chỉ chạy khi component đã mount hoàn toàn (SafeMountWrapper)
  return (
    <Suspense fallback={<Loading />}>
      <SafeMountWrapper>
        <EntityDataGrid entitySlug={entity} />
      </SafeMountWrapper>
    </Suspense>
  );
}
