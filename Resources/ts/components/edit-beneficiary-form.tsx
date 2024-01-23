/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEventHandler } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Input,
  SimpleGrid,
  chakra
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { Save } from "react-feather";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { AddressForm } from "@ziswapp/components/address-form";
import { Select } from "@ziswapp/components/select";
import { useTypeSelectOption } from "../hooks/use-options";

export interface EditBeneficiaryFormProps {
  beneficiary: Modules.Utilization.Models.Beneficiary;
}

export const EditBeneficiaryForm = ({ beneficiary }: EditBeneficiaryFormProps) => {
  const { options: typeOptions } = useTypeSelectOption();

  const form = useForm<any>({
    nik: beneficiary.nik || "",
    name: beneficiary.name || "",
    email: beneficiary.email || "",
    phone: beneficiary.phone || "",
    phone_country: beneficiary.phone_country || "ID",
    type: {
      label: beneficiary.type.name,
      value: beneficiary.type
    },
    sex: beneficiary.sex ? { label: beneficiary.sex, value: beneficiary.sex } : null,
    age_range: beneficiary.age_range
      ? { label: beneficiary.age_range, value: beneficiary.age_range }
      : null,
    address: beneficiary.address || "",
    postal_code: beneficiary.postal_code || "",
    province: beneficiary.province
      ? { label: beneficiary.province.name, value: beneficiary.province.code }
      : null,
    city: beneficiary.city ? { label: beneficiary.city.name, value: beneficiary.city.code } : null,
    district: beneficiary.district
      ? { label: beneficiary.district.name, value: beneficiary.district.code }
      : null,
    village: beneficiary.village
      ? { label: beneficiary.village.name, value: beneficiary.village.code }
      : null
  });

  const onSubmit: FormEventHandler = (e) => {
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

    form.put(`/utilization/beneficiary/${beneficiary.id}`, {
      onSuccess: () => {
        form.reset();
        form.clearErrors();
      }
    });
  };

  return (
    <Card as={chakra.form} variant="outline" onSubmit={onSubmit}>
      <CardBody>
        <SimpleGrid gap={6} columns={2}>
          <FormControl as={GridItem} colSpan={2} isRequired isInvalid={Boolean(form.errors?.name)}>
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
              value={form.data.type}
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
      </CardBody>
      <CardFooter justifyContent="end">
        <ButtonGroup>
          <Button leftIcon={<Icon as={Save} />} isLoading={form.processing} type="submit">
            Simpan
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
