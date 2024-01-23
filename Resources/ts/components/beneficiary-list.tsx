import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Icon,
  Input,
  VStack
} from "@chakra-ui/react";
import { TablePagination } from "@ziswapp/components/table-pagination";
import { Search } from "react-feather";
import { BeneficiaryTable } from "./beneficiary-table";
import { Link } from "@inertiajs/react";
import QueryString from "qs";
import { useState } from "react";
import { useLocation } from "@ziswapp/hooks";

export interface BeneficiaryListCardProps {
  beneficiaries: Array<Modules.Utilization.Models.Beneficiary>;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
  };
  onPageChange: (newPage: number) => void;
}

export const BeneficiaryListCard = ({
  beneficiaries,
  meta,
  onPageChange,
  ...props
}: BeneficiaryListCardProps) => {
  const { params, path } = useLocation();

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
          href={`${path}?${QueryString.stringify({
            ...params,
            beneficiaryKeyword: keyword
          })}`}
        >
          Cari
        </Button>
      </CardHeader>
      <CardBody px={beneficiaries.length <= 0 ? undefined : 0}>
        <BeneficiaryTable beneficiaries={beneficiaries} />
      </CardBody>
      <CardFooter as={VStack} align="end">
        <TablePagination {...meta} px={0} onPageChange={onPageChange} />
      </CardFooter>
    </Card>
  );
};
