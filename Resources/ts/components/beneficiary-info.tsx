import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Textarea
} from "@chakra-ui/react";

export interface BeneficiaryInfoProps {
  beneficiary: Modules.Utilization.Models.Beneficiary;
}

export const BeneficiaryInfo = (props: BeneficiaryInfoProps) => {
  return (
    <Card variant="outline">
      <CardBody as={SimpleGrid} gap={6} columns={{ base: 1, lg: 3 }}>
        <FormControl isReadOnly>
          <FormLabel>Nomor PM</FormLabel>
          <Input value={props.beneficiary.identification_number} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Nama</FormLabel>
          <Input value={props.beneficiary.name} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Tipe</FormLabel>
          <Input value={props.beneficiary.type.name} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Nomor Induk</FormLabel>
          <Input value={props.beneficiary.nik || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Email</FormLabel>
          <Input value={props.beneficiary.email || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Nomor Telepon</FormLabel>
          <Input value={props.beneficiary.phone || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Jenis Kelamin</FormLabel>
          <Input value={props.beneficiary.sex || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Kelompok Usia</FormLabel>
          <Input value={props.beneficiary.age_range || "-"} />
        </FormControl>
        <FormControl isReadOnly as={GridItem} colSpan={3}>
          <FormLabel>Alamat</FormLabel>
          <Textarea value={props.beneficiary.address || "-"} resize="none" />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Provinsi</FormLabel>
          <Input value={props.beneficiary.province?.name || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Kota / Kabupaten</FormLabel>
          <Input value={props.beneficiary.city?.name || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Kecamatan</FormLabel>
          <Input value={props.beneficiary.district?.name || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Desa</FormLabel>
          <Input value={props.beneficiary.village?.name || "-"} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Kode Pos</FormLabel>
          <Input value={props.beneficiary.postal_code || "-"} />
        </FormControl>
      </CardBody>
    </Card>
  );
};
