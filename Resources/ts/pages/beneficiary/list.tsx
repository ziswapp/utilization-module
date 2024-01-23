import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Icon,
  IconButton,
  SimpleGrid
} from "@chakra-ui/react";
import { Link, router } from "@inertiajs/react";
import { ArrowRight } from "react-feather";
import { useCallback } from "react";
import QueryString from "qs";

import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { useLocation } from "@ziswapp/hooks";
import { Pagination } from "@ziswapp/types/pagination";
import { TablePagination } from "@ziswapp/components/table-pagination";

import { BeneficiaryTable } from "../../components/beneficiary-table";
import { BeneficiaryFilterForm } from "../../components/beneficiary-filter-form";
import { BeneficiarySearchForm } from "../../components/beneficiary-search-form";

type PageProps = {
  beneficiaries: Pagination<Modules.Utilization.Models.Beneficiary>;
};

const Page = (props: PageProps) => {
  const { params, filter, path } = useLocation();

  const onSearch = useCallback(
    (keyword: string) => {
      router.get(
        `${path}?q=${keyword}&page=1&${QueryString.stringify(
          {
            filter: { ...filter }
          },
          { arrayFormat: "comma" }
        )}`
      );
    },
    [filter]
  );

  const onFilterChange = useCallback(
    (key: string, value: string | number) => {
      router.get(
        `${path}?q=${params?.q || ""}&page=1&${QueryString.stringify(
          {
            filter: { ...filter, [key]: value }
          },
          { arrayFormat: "comma" }
        )}`
      );
    },
    [filter, params]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      router.get(
        `${path}?q=${params?.q}&page=${newPage}&${QueryString.stringify(
          {
            filter: { ...filter }
          },
          { arrayFormat: "comma" }
        )}`
      );
    },
    [filter, params]
  );

  return (
    <AppLayout permission="menu.utilization.beneficiary">
      <PageHeader title="Penerima Manfaat" subtitle="Daftar penerima manfaat disini" />
      <SimpleGrid gap={6}>
        <Card variant="outline">
          <CardBody as={SimpleGrid} gap={6}>
            <BeneficiarySearchForm onSubmit={onSearch} />
            <BeneficiaryFilterForm onFilter={onFilterChange} />
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardBody px={props.beneficiaries.data.length <= 0 ? undefined : 0}>
            <BeneficiaryTable
              beneficiaries={props.beneficiaries.data}
              action={(beneficiary) => (
                <ButtonGroup variant="outline" size="xs">
                  <IconButton
                    size="xs"
                    aria-label="Lihat"
                    as={Link}
                    href={`/utilization/beneficiary/${beneficiary.id}`}
                    icon={<Icon as={ArrowRight} />}
                  />
                </ButtonGroup>
              )}
            />
          </CardBody>
          <CardFooter justifyContent="end">
            <TablePagination
              px={0}
              onPageChange={onPageChange}
              total={props.beneficiaries.total}
              lastPage={props.beneficiaries.last_page}
              currentPage={props.beneficiaries.current_page}
            />
          </CardFooter>
        </Card>
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
