import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Icon,
  IconButton,
  Input
} from "@chakra-ui/react";
import { TablePagination } from "@ziswapp/components/table-pagination";
import { CheckSquare, PlusSquare, Search } from "react-feather";
import { BeneficiaryTable } from "./beneficiary-table";
import { Link, router } from "@inertiajs/react";
import { MouseEventHandler, useState } from "react";
import { useParamLocation } from "@ziswapp/hooks";
import QueryString from "qs";

export interface SelectBeneficiaryTableCardProps {
  utilization: Modules.Utilization.Models.Utilization;
  beneficiaries: Array<Modules.Utilization.Models.Beneficiary>;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
  };
  onPageChange: (newPage: number) => void;
  onNew?: MouseEventHandler<HTMLButtonElement>;
}

export const SelectBeneficiaryTableCard = ({
  utilization,
  beneficiaries,
  onNew,
  meta,
  onPageChange,
  ...props
}: SelectBeneficiaryTableCardProps) => {
  const params = useParamLocation();

  const [keyword, setKeyword] = useState<string>(params?.candidateKeyword || "");

  return (
    <Card variant="outline" {...props}>
      <CardHeader as={HStack} justify="space-between">
        <HStack w="full">
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
              candidateKeyword: keyword
            })}`}
          >
            Cari
          </Button>
        </HStack>
        <Button leftIcon={<Icon as={PlusSquare} />} onClick={onNew}>
          Tambah
        </Button>
      </CardHeader>
      <CardBody px={beneficiaries.length <= 0 ? undefined : 0}>
        <BeneficiaryTable
          beneficiaries={beneficiaries}
          action={(beneficiary) => (
            <IconButton
              size="xs"
              aria-label="Pilih"
              icon={<Icon as={CheckSquare} />}
              variant="outline"
              onClick={(e) => {
                e.preventDefault();

                router.post(`/utilization/${utilization.id}/beneficiary/attach`, {
                  beneficiaries: [beneficiary.id]
                });
              }}
            />
          )}
        />
      </CardBody>
      <CardFooter justifyContent="end">
        <TablePagination {...meta} onPageChange={onPageChange} px={0} />
      </CardFooter>
    </Card>
  );
};
