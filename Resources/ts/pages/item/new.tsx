import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { SimpleGrid } from "@chakra-ui/react";
import { SimpleInfoCard } from "../../components/simple-info";
import { NewItemForm } from "../../components/new-item-form";
import { NewItemTable } from "../../components/new-item-table";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
  items: Array<Modules.Utilization.Models.UtilizationItem>;
};

const Page = (props: PageProps) => {
  return (
    <AppLayout permission="menu.utilization.create">
      <PageHeader title="Penggunaan Dana" subtitle="Tambah item penggunaan dana disini." />
      <SimpleGrid gap={6}>
        <SimpleInfoCard utilization={props.utilization} />
        <NewItemForm utilization={props.utilization} />
        <NewItemTable utilization={props.utilization} items={props.items} />
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
