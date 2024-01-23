import {
  Alert,
  AlertDescription,
  AlertIcon,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Table,
  TableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import dayjs from "@ziswapp/utils/datetime";
import numberFormat from "@ziswapp/utils/number-format";
import { ReactElement, ReactNode, useMemo } from "react";

const getBadgeColorScheme = (status: string) => {
  switch (status) {
    case "cancel":
      return "red";
    case "new":
      return "blue";
    default:
      return "gray";
  }
};

export type UtilizationTableProps = {
  utilizations: Array<Modules.Utilization.Models.Utilization>;
  action?: (item: Partial<Modules.Utilization.Models.Utilization>) => ReactNode | ReactElement;
} & TableProps;

export const UtilizationTable = ({
  utilizations = [],
  action,
  ...props
}: UtilizationTableProps) => {
  const renderAlert = useMemo(
    () => (
      <Alert status="warning" rounded="md">
        <AlertIcon />
        <AlertDescription>Saat ini belum ada penggunaan dana yang ditampilkan</AlertDescription>
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
            <Th>Tanggal</Th>
            <Th>Jenis</Th>
            <Th>Penggunaan</Th>
            <Th>Status</Th>
            <Th isNumeric>Nominal</Th>
            {action && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {utilizations?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.identification_number}</Td>
              <Td>{dayjs(item.use_at).format("DD MMM YYYY")}</Td>
              <Td>{item.type.name}</Td>
              <Td>{item.description}</Td>
              <Td>
                <Badge colorScheme={getBadgeColorScheme(item.status)}>{item.status}</Badge>
              </Td>
              <Td isNumeric>{numberFormat(item.amount)}</Td>
              {action && <Td isNumeric>{action(item)}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    ),
    [utilizations]
  );

  return utilizations.length <= 0 ? renderAlert : renderTable;
};

export type UtilizationTableCardProps = {
  utilizations: Array<Modules.Utilization.Models.Utilization>;
  pagination?: ReactNode;
  header?: ReactNode;
  tableAction?: (item: Partial<Modules.Utilization.Models.Utilization>) => ReactNode | ReactElement;
} & CardProps;

export const UtilizationTableCard = ({
  utilizations,
  header,
  pagination,
  tableAction,
  ...props
}: UtilizationTableCardProps) => {
  return (
    <Card {...props}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody px={utilizations.length <= 0 ? undefined : 0}>
        <UtilizationTable utilizations={utilizations} action={tableAction} />
      </CardBody>
      <CardFooter justifyContent="end">{pagination}</CardFooter>
    </Card>
  );
};
