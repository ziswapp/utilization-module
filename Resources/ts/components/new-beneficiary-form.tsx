/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  SimpleGrid,
  Text,
  chakra
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { AddressForm } from "@ziswapp/components/address-form";
import { Save } from "react-feather";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { useTypeSelectOption } from "../hooks/use-options";
import { Select } from "@ziswapp/components/select";
import { MouseEvent } from "react";

export interface NewBeneficiaryFormProps
  extends Omit<ModalProps, "isCentered" | "children" | "closeOnOverlayClick"> {
  utilization: Modules.Utilization.Models.Utilization;
}

export const NewBeneficiaryForm = ({ utilization, onClose, ...props }: NewBeneficiaryFormProps) => {
  const { options: typeOptions } = useTypeSelectOption();

  const form = useForm<any>({
    nik: "",
    name: "",
    email: "",
    phone: "",
    phone_country: "ID"
  });

  const onCloseModal = () => {
    form.reset();
    form.clearErrors();

    onClose();
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>, closeForm: boolean) => {
    e.preventDefault();

    form.transform(({ type, province, city, district, village, ...data }) => {
      return {
        ...data,
        sex: data.sex?.value || "",
        age_range: data.age_range?.value || "",
        phone_country: data.phone_country || "ID",
        beneficiary_type_id: type?.value?.id || "",
        province_code: province?.value || "",
        city_code: city?.value || "",
        district_code: district?.value || "",
        village_code: village?.value || ""
      };
    });

    form.post(`/utilization/${utilization.id}/beneficiary`, {
      onSuccess: () => {
        form.reset();
        form.clearErrors();

        if (closeForm) {
          onCloseModal();
        }
      }
    });
  };

  return (
    <Modal isCentered size="6xl" closeOnOverlayClick={false} onClose={onCloseModal} {...props}>
      <ModalOverlay />
      <ModalContent as={chakra.form}>
        <ModalHeader>
          <Text fontSize="xl" fontWeight="semibold">
            Tambah Penerima Manfaat
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid gap={6} columns={2}>
            <FormControl
              as={GridItem}
              colSpan={2}
              isRequired
              isInvalid={Boolean(form.errors?.name)}
            >
              <FormLabel>Nama</FormLabel>
              <Input
                placeholder="Nama disini"
                value={form.data.name}
                onChange={(e) => form.setData("name", e.target.value)}
              />
              <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(form.errors.beneficiary_type_id)}>
              <FormLabel>Tipe</FormLabel>
              <Select
                isClearable
                placeholder="Pilih tipe disini."
                options={typeOptions}
                onChange={(newValue) => {
                  form.clearErrors("beneficiary_type_id");

                  form.setData("type", newValue || "");
                }}
              />
              <FormErrorMessage>{form.errors.beneficiary_type_id}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(form.errors?.nik)}>
              <FormLabel>Nomor Induk</FormLabel>
              <Input
                placeholder="Nomor nik disini"
                value={form.data.nik}
                onChange={(e) => form.setData("nik", e.target.value)}
              />
              <FormErrorMessage>{form.errors?.nik}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(form.errors?.email)}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Alamat email disini"
                value={form.data.email}
                onChange={(e) => form.setData("email", e.target.value)}
              />
              <FormErrorMessage>{form.errors?.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(form.errors.phone || form.errors.phone_country)}>
              <FormLabel>Nomor Telepon</FormLabel>
              <PhoneInputWithCountrySelect
                country={form.data.phone_country}
                defaultCountry="ID"
                inputComponent={Input}
                placeholder="Enter phone number"
                value={form.data.phone}
                onChange={(e: string) => {
                  form.clearErrors("phone");

                  form.setData((prevData: any) => ({
                    ...prevData,
                    phone: e
                  }));
                }}
                onCountryChange={(country) => {
                  form.clearErrors("phone_country");

                  form.setData((prevData: any) => ({
                    ...prevData,
                    phone_country: country
                  }));
                }}
                countryCallingCodeEditable={false}
                name="phone"
                international
              />
              <FormErrorMessage>{form.errors.phone || form.errors.phone_country}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(form.errors.age_range)}>
              <FormLabel>Kelompok Usia</FormLabel>
              <Select
                isClearable
                placeholder="Pilih kelompok usia disini"
                options={[
                  { value: "Anak - anak", label: "Anak - anak" },
                  { value: "Remaja", label: "Remaja" },
                  { value: "Dewasa", label: "Dewasa" },
                  { value: "Lansia", label: "Lansia" }
                ]}
                onChange={(newValue) => {
                  form.clearErrors("age_range");

                  form.setData("age_range", newValue || "");
                }}
              />
              <FormErrorMessage>{form.errors.age_range}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(form.errors.sex)}>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select
                isClearable
                placeholder="Pilih jenis kelamin disini"
                options={[
                  { value: "Laki - laki", label: "Laki - laki" },
                  { value: "Perempuan", label: "Perempuan" }
                ]}
                onChange={(newValue) => {
                  form.clearErrors("sex");

                  form.setData("sex", newValue || "");
                }}
              />
              <FormErrorMessage>{form.errors.sex}</FormErrorMessage>
            </FormControl>
            <GridItem colSpan={2}>
              <AddressForm data={form.data} setData={form.setData} />
            </GridItem>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter justifyContent="end">
          <ButtonGroup>
            <Button
              leftIcon={<Icon as={Save} />}
              onClick={(e) => onSubmit(e, true)}
              isLoading={form.processing}
            >
              Simpan
            </Button>
            <Button
              leftIcon={<Icon as={Save} />}
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();

                onSubmit(e, false);
              }}
              isLoading={form.processing}
            >
              Simpan dan Tambah lagi
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
