import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { EditForm } from "../components/edit-form";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
};

const Page = (props: PageProps) => {
  return (
    <AppLayout permission="action.utilization.edit">
      <PageHeader title="Penggunaan Dana" subtitle="Ubah data penggunaan dana disini." />
      <EditForm utilization={props.utilization} />
    </AppLayout>
  );
};

export default Page;
