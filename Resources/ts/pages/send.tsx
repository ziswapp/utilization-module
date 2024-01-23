import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { SimpleGrid } from "@chakra-ui/react";

import { SimpleInfoCard } from "../components/simple-info";
import { ItemTableCard } from "../components/item-table";
import { PaymentInfoCard } from "../components/payment-info";
import { AttachmentListCard } from "../components/attachment-list";
import { BeneficiaryListCard } from "../components/beneficiary-list";
import { Pagination } from "@ziswapp/types/pagination";
import { router } from "@inertiajs/react";
import QueryString from "qs";
import { useParamLocation, usePathLocation } from "@ziswapp/hooks";
import { SendUtilizationForm } from "../components/send-utilization-form";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
  items: Array<Modules.Utilization.Models.UtilizationItem>;
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
  beneficiaries: Pagination<Modules.Utilization.Models.Beneficiary>;
};

const Page = (props: PageProps) => {
  const path = usePathLocation();
  const params = useParamLocation();

  return (
    <AppLayout permission="action.utilization.create">
      <PageHeader title="Penggunaan Dana" subtitle="Detail data penggunaan dana disini." />
      <SimpleGrid gap={6}>
        <SimpleInfoCard utilization={props.utilization} />
        {props.utilization.payment_type === "transfer" && (
          <PaymentInfoCard utilization={props.utilization} />
        )}
        <ItemTableCard items={props.items} />
        {props.utilization.type?.is_distribution && (
          <BeneficiaryListCard
            beneficiaries={props.beneficiaries?.data || []}
            meta={{
              currentPage: props.beneficiaries?.current_page,
              lastPage: props.beneficiaries?.last_page,
              total: props.beneficiaries?.total
            }}
            onPageChange={(newPage) =>
              router.get(
                `${path}?${QueryString.stringify({
                  ...params,
                  beneficiaryPage: newPage
                })}`
              )
            }
          />
        )}
        <AttachmentListCard attachments={props.attachments} />
        <SendUtilizationForm utilization={props.utilization} />
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
