import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { CreateNewForm } from "../components/create-new-form";

const Page = () => {
  return (
    <AppLayout permission="menu.utilization.create">
      <PageHeader title="Penggunaan Dana" subtitle="Tambah data penggunaan dana disini." />
      <CreateNewForm />
    </AppLayout>
  );
};

export default Page;
