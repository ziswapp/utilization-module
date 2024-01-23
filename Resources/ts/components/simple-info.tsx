import {
  Card,
  CardBody,
  CardProps,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  SimpleGridProps
} from "@chakra-ui/react";
import dayjs from "@ziswapp/utils/datetime";

type SimpleInfoProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & SimpleGridProps;

export const SimpleInfo = ({ utilization, ...props }: SimpleInfoProps) => {
  return (
    <SimpleGrid columns={2} spacing={4} {...props}>
      <GridItem colSpan={2}>
        <FormControl isReadOnly>
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <Input id="description" value={utilization?.description || "-"} />
        </FormControl>
      </GridItem>
      <FormControl isReadOnly>
        <FormLabel htmlFor="type">Jenis Penggunaan</FormLabel>
        <Input id="type" value={utilization?.type?.name} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="identification_number">Nomor transaksi</FormLabel>
        <Input id="identification_number" value={utilization?.identification_number} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="use_date_at">Tanggal Penggunaan</FormLabel>
        <Input id="use_date_at" value={dayjs(utilization?.use_at).format("DD MMMM YYYY")} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="amount">Nominal</FormLabel>
        <Input
          id="amount"
          value={new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(
            utilization?.amount || 0
          )}
        />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="payment_type">Pembayaran</FormLabel>
        <Input
          id="payment_type"
          value={utilization?.payment_type === "cash" ? "Tunai" : "Transfer"}
        />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="status">Status</FormLabel>
        <Input id="status" value={utilization?.status} />
      </FormControl>
    </SimpleGrid>
  );
};

type SimpleInfoCardProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & CardProps;

export const SimpleInfoCard = ({ utilization, ...props }: SimpleInfoCardProps) => (
  <Card variant="outline" {...props}>
    <CardBody>
      <SimpleInfo utilization={utilization} />
    </CardBody>
  </Card>
);
