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
import numberFormat from "@ziswapp/utils/number-format";
import { ReactElement, ReactNode, useMemo } from "react";

export type ItemTableProps = {
  items: Array<Modules.Utilization.Models.UtilizationItem>;
  action?: (item: Partial<Modules.Utilization.Models.UtilizationItem>) => ReactNode | ReactElement;
} & TableProps;

export const ItemTable = ({ items = [], action, ...props }: ItemTableProps) => {
  const totalAmount = useMemo(
    () => items.reduce((prevItem, currentItem) => prevItem + Number(currentItem?.amount), 0),
    [items]
  );

  const renderAlert = useMemo(
    () => (
      <Alert status="warning" rounded="md">
        <AlertIcon />
        <AlertDescription>Saat ini belum ada detail item yang ditampilkan</AlertDescription>
      </Alert>
    ),
    []
  );

  const renderTable = useMemo(
    () => (
      <Table {...props}>
        <Thead>
          <Tr>
            <Th>Deskripsi</Th>
            <Th>Sumber dana</Th>
            <Th>Asnaf</Th>
            <Th isNumeric>Nominal</Th>
            {action && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {items?.map((item) => (
            <Tr key={item.id}>
              <Td>{item.description}</Td>
              <Td>{item.source?.name}</Td>
              <Td>{item.beneficiary?.name || "-"}</Td>
              <Td isNumeric>{numberFormat(item.amount)}</Td>
              {action && <Td isNumeric>{action(item)}</Td>}
            </Tr>
          ))}
          {items.length > 0 && (
            <Tr>
              <Td isNumeric colSpan={4}>
                {new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(totalAmount)}
              </Td>
              {action && <Td />}
            </Tr>
          )}
        </Tbody>
      </Table>
    ),
    [items]
  );

  return items.length <= 0 ? renderAlert : renderTable;
};

export type ItemTableCardProps = {
  items: Array<Modules.Utilization.Models.UtilizationItem>;
  action?: (item: Partial<Modules.Utilization.Models.UtilizationItem>) => ReactNode | ReactElement;
} & CardProps;

export const ItemTableCard = ({ items, action, ...props }: ItemTableCardProps) => {
  return (
    <Card {...props}>
      <CardBody px={items.length <= 0 ? undefined : 0}>
        <ItemTable items={items} action={action} />
      </CardBody>
    </Card>
  );
};
