import {
  Card,
  CardBody,
  CardProps,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  SimpleGridProps,
  Textarea
} from "@chakra-ui/react";
import dayjs from "@ziswapp/utils/datetime";

type DistributionProgramInfoProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & SimpleGridProps;

export const DistributionProgramInfo = ({
  utilization,
  ...props
}: DistributionProgramInfoProps) => {
  return (
    <SimpleGrid columns={2} spacing={4} {...props}>
      <FormControl isReadOnly>
        <FormLabel htmlFor="distribution_at">Tanggal Penyaluran</FormLabel>
        <Input
          id="distribution_at"
          value={
            utilization?.distribution_at
              ? dayjs(utilization?.distribution_at).format("DD MMM YYYY")
              : "-"
          }
        />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel htmlFor="program">Tanggal Penyaluran</FormLabel>
        <Input id="program" value={utilization?.program?.name || "-"} />
      </FormControl>
      <FormControl isReadOnly as={GridItem} colSpan={2}>
        <FormLabel htmlFor="distribution_program_description">Deskripsi Program</FormLabel>
        <Textarea
          resize="none"
          id="distribution_program_description"
          value={utilization?.distribution_program_description || "-"}
        />
      </FormControl>
    </SimpleGrid>
  );
};

type DistributionProgramInfoCardProps = {
  utilization: Modules.Utilization.Models.Utilization;
} & CardProps;

export const DistributionProgramInfoCard = ({
  utilization,
  ...props
}: DistributionProgramInfoCardProps) => (
  <Card variant="outline" {...props}>
    <CardBody>
      <DistributionProgramInfo utilization={utilization} />
    </CardBody>
  </Card>
);
