import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { SimpleGrid } from "@chakra-ui/react";

import { EditBeneficiaryForm } from "../../components/edit-beneficiary-form";

export interface PageProps {
  beneficiary: Modules.Utilization.Models.Beneficiary;
}

const Page = (props: PageProps) => {
  return (
    <AppLayout>
      <PageHeader title="Penerima Manfaat" subtitle="Detail data penerima manfaat" />
      <SimpleGrid gap={6}>
        <EditBeneficiaryForm beneficiary={props.beneficiary} />
      </SimpleGrid>
    </AppLayout>
  );
};
export default Page;
