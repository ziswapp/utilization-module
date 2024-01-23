import {
  Alert,
  AlertDescription,
  AlertIcon,
  Card,
  CardBody,
  CardProps,
  Table,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { NoValue } from "@ziswapp/components/no-value";
import { ReactElement, ReactNode, useMemo } from "react";

export type BeneficiaryTableProps = {
  beneficiaries: Array<Modules.Utilization.Models.Beneficiary>;
  action?: (item: Partial<Modules.Utilization.Models.Beneficiary>) => ReactNode | ReactElement;
} & TableProps;

export const BeneficiaryTable = ({
  beneficiaries = [],
  action,
  ...props
}: BeneficiaryTableProps) => {
  const renderAlert = useMemo(
    () => (
      <Alert status="warning" rounded="md">
        <AlertIcon />
        <AlertDescription>Saat ini belum ada penerima manfaat yang ditampilkan</AlertDescription>
      </Alert>
    ),
    []
  );

  const renderTable = useMemo(
    () => (
      <Table {...props}>
        <Thead>
          <Tr>
            <Th>Nomor</Th>
            <Th>NIK</Th>
            <Th>Nama</Th>
            <Th>Asnaf</Th>
            <Th>Telepon</Th>
            <Th>Jenis Kelamin</Th>
            <Th>Kelompok Usia</Th>
            {action && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {beneficiaries?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.identification_number}</Td>
              <Td>{item.nik || <NoValue />}</Td>
              <Td>{item.name}</Td>
              <Td>{item.type.name}</Td>
              <Td>{item.phone || <NoValue />}</Td>
              <Td>{item.sex || <NoValue />}</Td>
              <Td>{item.age_range || <NoValue />}</Td>
              {action && <Td isNumeric>{action(item)}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    ),
    [beneficiaries]
  );

  return beneficiaries.length <= 0 ? renderAlert : renderTable;
};

export type BeneficiaryTableCardProps = {
  beneficiaries: Array<Modules.Utilization.Models.Beneficiary>;
  action?: (item: Partial<Modules.Utilization.Models.Beneficiary>) => ReactNode | ReactElement;
} & CardProps;

export const BeneficiaryTableCard = ({
  beneficiaries,
  action,
  ...props
}: BeneficiaryTableCardProps) => {
  return (
    <Card variant="outline" {...props}>
      <CardBody px={beneficiaries.length <= 0 ? undefined : 0}>
        <BeneficiaryTable beneficiaries={beneficiaries} action={action} />
      </CardBody>
    </Card>
  );
};
