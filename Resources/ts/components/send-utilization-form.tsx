import {
  Card,
  CardBody,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertDescription,
  CardFooter,
  Button,
  Icon
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { Save } from "react-feather";

interface SendUtilizationFormProps {
  utilization: Modules.Utilization.Models.Utilization;
}

export const SendUtilizationForm = (props: SendUtilizationFormProps) => {
  const form = useForm();

  return (
    <Card variant="outline">
      <CardBody as={SimpleGrid} gap={6}>
        {form.errors?.utilization && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            <AlertDescription>{form.errors?.utilization}</AlertDescription>
          </Alert>
        )}
        <Alert status="warning" rounded="md">
          <AlertIcon />
          <AlertDescription>
            Mohon di pastikan data yang sudah diinput benar dan tepat, karena setelah di simpan
            tidak bisa di ubah kembali
          </AlertDescription>
        </Alert>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button
          leftIcon={<Icon as={Save} />}
          isLoading={form.processing}
          onClick={(e) => {
            e.preventDefault();

            form.post(`/utilization/${props.utilization.id}/send`);
          }}
        >
          Simpan
        </Button>
      </CardFooter>
    </Card>
  );
};
