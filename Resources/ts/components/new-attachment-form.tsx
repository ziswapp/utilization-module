import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  SimpleGrid,
  VStack,
  chakra,
  useToast
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { Dropzone } from "@ziswapp/components/dropzone";
import { FormEventHandler } from "react";
import { Upload } from "react-feather";

type FormData = {
  file: File | null;
  name: string;
};

type NewAttachmentFormProps = {
  utilization: Modules.Utilization.Models.Utilization;
};

export const NewAttachmentForm = ({ utilization }: NewAttachmentFormProps) => {
  const toast = useToast();

  const form = useForm<FormData>({
    file: null,
    name: ""
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    form.post(`/utilization/${utilization.id}/attachment`, {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();

        toast({
          title: "Success",
          description: "Lampiran berhasil di simpan",
          status: "success"
        });
      }
    });
  };

  return (
    <Card as={chakra.form} onSubmit={onSubmit}>
      <CardBody>
        <SimpleGrid gap={6}>
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>Lampiran hanya bisa maksimal 5MB</AlertDescription>
          </Alert>

          <FormControl isRequired isInvalid={Boolean(form.errors.name)}>
            <FormLabel>Nama lampiran</FormLabel>
            <Input
              placeholder="Nama lampiran pencairan disini..."
              value={form.data.name}
              onChange={(e) => form.setData("name", e.currentTarget.value)}
            />
            <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.file)}>
            <FormLabel>Lampiran</FormLabel>
            <VStack spacing={4}>
              <Dropzone
                placeholder="Drag 'n' drop some files here, or click to select files"
                options={{
                  maxSize: 1024 * 1024 * 5,
                  maxFiles: 1,
                  onDropAccepted: (files) => {
                    form.setData((previousData: FormData) => ({
                      ...previousData,
                      file: files[0]
                    }));
                  }
                }}
              />
              <Input isReadOnly value={form.data.file ? form.data.file.name : ""} />
            </VStack>
            <FormErrorMessage>{form.errors?.file}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button leftIcon={<Icon as={Upload} />} type="submit" isLoading={form.processing}>
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};
