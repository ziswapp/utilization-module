import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import {
  ButtonGroup,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid
} from "@chakra-ui/react";
import { Edit, FilePlus, PlusSquare, Save, UserPlus, XOctagon } from "react-feather";
import { Link, router } from "@inertiajs/react";
import QueryString from "qs";

import { useParamLocation } from "@ziswapp/hooks";
import { Pagination } from "@ziswapp/types/pagination";

import { SimpleInfoCard } from "../components/simple-info";
import { ItemTableCard } from "../components/item-table";
import { PaymentInfoCard } from "../components/payment-info";
import { AttachmentListCard } from "../components/attachment-list";
import { BeneficiaryListCard } from "../components/beneficiary-list";
import { DistributionProgramInfoCard } from "../components/distribution-program-info";
import { ActionButton } from "@ziswapp/components/action-button";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
  items: Array<Modules.Utilization.Models.UtilizationItem>;
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
  beneficiaries: Pagination<Modules.Utilization.Models.Beneficiary>;
};

const Page = (props: PageProps) => {
  const params = useParamLocation();

  return (
    <AppLayout permission="action.utilization.show">
      <PageHeader title="Penggunaan Dana" subtitle="Detail data penggunaan dana disini.">
        {props.utilization.status !== "cancel" && (
          <ButtonGroup>
            {props.utilization.status === "draft" && (
              <>
                <ActionButton
                  permission="action.utilization.edit"
                  colorScheme="yellow"
                  leftIcon={<Icon as={Edit} />}
                  as={Link}
                  href={`/utilization/${props.utilization.id}/edit`}
                >
                  Ubah
                </ActionButton>
                <ActionButton
                  permission="action.utilization.create"
                  leftIcon={<Icon as={Save} />}
                  as={Link}
                  href={`/utilization/${props.utilization.id}/send`}
                >
                  Simpan
                </ActionButton>
              </>
            )}
            <ActionButton
              permission="action.utilization.cancel"
              colorScheme="red"
              leftIcon={<Icon as={XOctagon} />}
              onClick={(e) => {
                e.preventDefault();

                router.patch(`/utilization/${props.utilization.id}/cancel`);
              }}
            >
              Batalkan
            </ActionButton>
            {props.utilization.status === "draft" && (
              <Menu>
                <MenuButton>
                  <ActionButton
                    permission="action.utilization.create"
                    colorScheme="orange"
                    leftIcon={<Icon as={PlusSquare} />}
                  >
                    Tambah
                  </ActionButton>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    icon={<Icon as={PlusSquare} />}
                    as={Link}
                    href={`/utilization/${props.utilization.id}/item/edit`}
                  >
                    Detail Item
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={UserPlus} />}
                    as={Link}
                    href={`/utilization/${props.utilization.id}/beneficiary/edit`}
                  >
                    Penerima Manfaat
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={FilePlus} />}
                    as={Link}
                    href={`/utilization/${props.utilization.id}/attachment/edit`}
                  >
                    Lampiran Berkas
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </ButtonGroup>
        )}
      </PageHeader>
      <SimpleGrid gap={6}>
        <SimpleInfoCard utilization={props.utilization} />
        {props.utilization.payment_type === "transfer" && (
          <PaymentInfoCard utilization={props.utilization} />
        )}
        {props.utilization.type?.is_distribution && (
          <DistributionProgramInfoCard utilization={props.utilization} />
        )}
        <ItemTableCard items={props.items} />
        {props.utilization.type?.is_distribution && (
          <BeneficiaryListCard
            beneficiaries={props.beneficiaries?.data || []}
            meta={{
              currentPage: props.beneficiaries.current_page,
              lastPage: props.beneficiaries.last_page,
              total: props.beneficiaries.total
            }}
            onPageChange={(newPage) =>
              router.get(
                `/utilization/${props.utilization.id}/send?${QueryString.stringify({
                  ...params,
                  beneficiaryPage: newPage
                })}`
              )
            }
          />
        )}
        <AttachmentListCard attachments={props.attachments} />
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
