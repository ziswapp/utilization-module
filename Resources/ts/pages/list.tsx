import { ButtonGroup, Card, CardBody, Icon, IconButton, SimpleGrid } from "@chakra-ui/react";
import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { Link, router } from "@inertiajs/react";
import { ArrowRight } from "react-feather";
import { TablePagination } from "@ziswapp/components/table-pagination";
import { useCallback } from "react";
import { useLocation } from "@ziswapp/hooks";
import QueryString from "qs";

import { UtilizationTableCard } from "../components/utilization-table";
import { SearchForm } from "../components/search-form";
import { FilterForm } from "../components/filter-form";

type PageProps = {
  utilizations: {
    data: Array<Modules.Utilization.Models.Utilization>;
    current_page: number;
    last_page: number;
    total: number;
  };
};

const Page = (props: PageProps) => {
  const { params, filter } = useLocation();

  const onSearch = useCallback(
    (keyword: string) => {
      router.get(
        `/utilization?q=${keyword}&page=1&${QueryString.stringify(
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
        `/utilization?q=${params?.q || ""}&page=1&${QueryString.stringify(
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
        `/utilization?q=${params?.q}&page=${newPage}&${QueryString.stringify(
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
    <AppLayout permission="menu.utilization">
      <PageHeader title="Penggunaan Dana" subtitle="Daftar data penggunaan dana disini." />
      <SimpleGrid gap={6}>
        <Card>
          <CardBody>
            <SimpleGrid gap={6}>
              <SearchForm onSubmit={onSearch} />
              <FilterForm onFilter={onFilterChange} />
            </SimpleGrid>
          </CardBody>
        </Card>
        <UtilizationTableCard
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
              currentPage={props.utilizations.current_page}
              total={props.utilizations.total}
              lastPage={props.utilizations.last_page}
              onPageChange={onPageChange}
            />
          }
        />
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
