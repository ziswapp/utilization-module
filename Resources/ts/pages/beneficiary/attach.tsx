import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { Button, Icon, SimpleGrid, useDisclosure } from "@chakra-ui/react";

import QueryString from "qs";
import { Pagination } from "@ziswapp/types/pagination";
import { router } from "@inertiajs/react";
import { useParamLocation } from "@ziswapp/hooks";
import { ArrowRightCircle } from "react-feather";

import { SimpleInfoCard } from "../../components/simple-info";
import { SelectBeneficiaryTableCard } from "../../components/select-beneficiary-table";
import { SelectedBeneficiaryTableCard } from "../../components/selected-beneficiary-table";
import { NewBeneficiaryForm } from "../../components/new-beneficiary-form";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
  candidates: Pagination<Modules.Utilization.Models.Beneficiary>;
  beneficiaries: Pagination<Modules.Utilization.Models.Beneficiary>;
};

const Page = (props: PageProps) => {
  const disclosure = useDisclosure();
  const params = useParamLocation();

  return (
    <AppLayout permission="menu.utilization.create">
      <PageHeader title="Penerima Manfaat" subtitle="Tambah pemerima manfaat disini." />
      <SimpleGrid gap={6}>
        <SimpleInfoCard utilization={props.utilization} />
        <SelectBeneficiaryTableCard
          utilization={props.utilization}
          beneficiaries={props.candidates.data}
          onNew={disclosure.onOpen}
          meta={{
            currentPage: props.candidates?.current_page,
            lastPage: props.candidates?.last_page,
            total: props.candidates?.total
          }}
          onPageChange={(newPage) =>
            router.get(
              `/utilization/${props.utilization.id}/beneficiary/new?${QueryString.stringify({
                ...params,
                candidatePage: newPage
              })}`
            )
          }
        />
        <SelectedBeneficiaryTableCard
          utilization={props.utilization}
          beneficiaries={props.beneficiaries.data}
          meta={{
            currentPage: props.beneficiaries?.current_page,
            lastPage: props.beneficiaries?.last_page,
            total: props.beneficiaries?.total
          }}
          onPageChange={(newPage) =>
            router.get(
              `/utilization/${props.utilization.id}/beneficiary/new?${QueryString.stringify({
                ...params,
                beneficiaryPage: newPage
              })}`
            )
          }
          nextAction={
            props.beneficiaries?.data?.length > 0 && (
              <Button
                rightIcon={<Icon as={ArrowRightCircle} />}
                onClick={(e) => {
                  e.preventDefault();

                  router.get(`/utilization/${props.utilization.id}/attachment/new`);
                }}
              >
                Selanjutnya
              </Button>
            )
          }
        />
        <NewBeneficiaryForm
          utilization={props.utilization}
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
        />
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
