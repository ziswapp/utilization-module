import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack
} from "@chakra-ui/react";
import { TablePagination } from "@ziswapp/components/table-pagination";
import { Search, X } from "react-feather";
import { BeneficiaryTable } from "./beneficiary-table";
import { Link, router } from "@inertiajs/react";
import QueryString from "qs";
import { ReactNode, useState } from "react";
import { useParamLocation } from "@ziswapp/hooks";

export interface SelectedBeneficiaryTableCardProps {
  utilization: Modules.Utilization.Models.Utilization;
  beneficiaries: Array<Modules.Utilization.Models.Beneficiary>;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
  };
  onPageChange: (newPage: number) => void;
  nextAction?: ReactNode;
}

export const SelectedBeneficiaryTableCard = ({
  utilization,
  beneficiaries,
  meta,
  onPageChange,
  nextAction,
  ...props
}: SelectedBeneficiaryTableCardProps) => {
  const params = useParamLocation();

  const [keyword, setKeyword] = useState<string>(params?.beneficiaryKeyword || "");

  return (
    <Card variant="outline" {...props}>
      <CardHeader as={HStack}>
        <Input
          placeholder="Cari menggunakan nama, nomor nik atau email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          leftIcon={<Icon as={Search} />}
          as={Link}
          href={`/utilization/${utilization.id}/beneficiary/new?${QueryString.stringify({
            ...params,
            beneficiaryKeyword: keyword
          })}`}
        >
          Cari
        </Button>
      </CardHeader>
      <CardBody px={beneficiaries.length <= 0 ? undefined : 0}>
        <BeneficiaryTable
          beneficiaries={beneficiaries}
          action={(beneficiary) => (
            <IconButton
              size="xs"
              aria-label="Delete"
              icon={<Icon as={X} />}
              variant="outline"
              colorScheme="red"
              onClick={(e) => {
                e.preventDefault();

                router.post(`/utilization/${utilization.id}/beneficiary/detach`, {
                  beneficiaries: [beneficiary.id]
                });
              }}
            />
          )}
        />
      </CardBody>
      <CardFooter as={VStack} align="end">
        <TablePagination {...meta} onPageChange={onPageChange} px={0} />
        {nextAction}
      </CardFooter>
    </Card>
  );
};
