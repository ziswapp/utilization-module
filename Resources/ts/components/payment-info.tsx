import {
  Card,
  CardBody,
  CardProps,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  SimpleGridProps
} from "@chakra-ui/react";

type PaymentInfoProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & SimpleGridProps;

export const PaymentInfo = ({ utilization, ...props }: PaymentInfoProps) => {
  return (
    <SimpleGrid columns={2} spacing={4} {...props}>
      <FormControl isReadOnly>
        <FormLabel htmlFor="payment_type">Pembayaran</FormLabel>
        <Input
          id="payment_type"
          value={utilization?.payment_type === "cash" ? "Tunai" : "Transfer"}
        />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="bank_name">Bank Tujuan</FormLabel>
        <Input id="bank_name" value={utilization?.bank_name || ""} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="bank_account_number">Rekening Tujuan</FormLabel>
        <Input id="bank_account_number" value={utilization?.bank_account_number || ""} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="bank_account_name">Atas Nama Rekening</FormLabel>
        <Input id="bank_account_name" value={utilization?.bank_account_name || ""} />
      </FormControl>
    </SimpleGrid>
  );
};

type PaymentInfoCardProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & CardProps;

export const PaymentInfoCard = ({ utilization, ...props }: PaymentInfoCardProps) => (
  <Card {...props}>
    <CardBody>
      <PaymentInfo utilization={utilization} />
    </CardBody>
  </Card>
);
