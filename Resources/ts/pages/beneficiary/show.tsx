import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { Pagination } from "@ziswapp/types/pagination";
import { usePathLocation } from "@ziswapp/hooks";
import { TablePagination } from "@ziswapp/components/table-pagination";

import { Link, router } from "@inertiajs/react";
import { useCallback } from "react";
import { ArrowRight, Edit } from "react-feather";
import {
  Button,
  ButtonGroup,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  VStack
} from "@chakra-ui/react";

import { BeneficiaryInfo } from "../../components/beneficiary-info";
import { UtilizationTableCard } from "../../components/utilization-table";
import { SearchForm } from "../../components/search-form";

export interface PageProps {
  beneficiary: Modules.Utilization.Models.Beneficiary;
  utilizations: Pagination<Modules.Utilization.Models.Utilization>;
}

const Page = (props: PageProps) => {
  const path = usePathLocation();

  const onSearch = useCallback(
    (keyword: string) => {
      router.get(`${path}?q=${keyword}&page=1`);
    },
    [path]
  );

  return (
    <AppLayout>
      <PageHeader title="Penerima Manfaat" subtitle="Detail data penerima manfaat">
        <Button
          colorScheme="yellow"
          leftIcon={<Icon as={Edit} />}
          as={Link}
          href={`/utilization/beneficiary/${props.beneficiary.id}/edit`}
        >
          Ubah
        </Button>
      </PageHeader>
      <SimpleGrid gap={6}>
        <BeneficiaryInfo beneficiary={props.beneficiary} />
        <UtilizationTableCard
          header={
            <SimpleGrid gap={6}>
              <VStack align="start">
                <Heading as="h4" size="md">
                  Penyaluran Program
                </Heading>
                <Text fontSize="md" color="gray.500">
                  Daftar penyaluran program untuk penerima manfaat ini
                </Text>
              </VStack>
              <SearchForm onSubmit={onSearch} />
            </SimpleGrid>
          }
          utilizations={props.utilizations.data}
          tableAction={(utilization) => (
            <ButtonGroup variant="outline" size="xs">
              <IconButton
                size="xs"
                aria-label="Lihat"
                as={Link}
                href={`/utilization/${utilization.id}`}
                icon={<Icon as={ArrowRight} />}
              />
            </ButtonGroup>
          )}
          pagination={
            <TablePagination
              total={props.utilizations.total}
              currentPage={props.utilizations.current_page}
              lastPage={props.utilizations.last_page}
            />
          }
        />
      </SimpleGrid>
    </AppLayout>
  );
};
export default Page;
