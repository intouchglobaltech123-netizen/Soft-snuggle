import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdmin } from "@/lib/admin";

// Every page in here also calls requireAdmin() itself: a layout is not re-run
// on every navigation, so it can't be the only lock.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <>
      <AdminHeader email={admin.email} />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">{children}</div>
    </>
  );
}
