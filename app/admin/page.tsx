import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { getCmsContent } from "@/lib/cms";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = { title: "Panel administrativo", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AdminPanel initial={await getCmsContent()} email={session.email} />;
}
