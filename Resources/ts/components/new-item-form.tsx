/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { Select as AsyncSelect } from "@ziswapp/components/select";
import { PlusSquare } from "react-feather";
import { useBeneficiarySelectOption, useFundingSourceSelectOption } from "../hooks/use-options";
import { FormEventHandler, useCallback } from "react";

interface FormData {
  description: string;
  source?: string | null | Record<string, unknown>;
  beneficiary?: string | null | Record<string, unknown>;

  amount: string;

  funding_source_id?: number | string;
  beneficiary_type_id?: number | string;
  budget: string;
}

interface NewItemFormProps {
  utilization: Modules.Utilization.Models.Utilization;
}

export const NewItemForm = (props: NewItemFormProps) => {
  const { options: sourceOptions } = useFundingSourceSelectOption();
  const { options: beneficiaryOptions } = useBeneficiarySelectOption();

  const form = useForm<any | FormData>({
    description: "",
    source: "",
    beneficiary: "",
    amount: ""
  });

  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();

      form.transform(({ source, beneficiary, ...data }: FormData): FormData => {
        const { value: sourceValue } = source as Record<string, Record<string, string | number>>;
        const { value: beneficiaryValue } = beneficiary as Record<
          string,
          Record<string, string | number>
        >;

        return {
          ...data,
          funding_source_id: sourceValue?.id || "",
          beneficiary_type_id: beneficiaryValue?.id || ""
        };
      });

      form.post(`/utilization/${props.utilization.id}/item`, {
        preserveState: false
      });
    },
    [props.utilization, form]
  );

  return (
    <Card variant="outline" as={chakra.form} onSubmit={onSubmit}>
      <CardBody>
        <SimpleGrid gap={6} columns={2}>
          <FormControl
            as={GridItem}
            colSpan={2}
            isRequired
            isInvalid={Boolean(form.errors.description)}
          >
            <FormLabel>Deskripsi</FormLabel>
            <Input
              placeholder="Deskripsi penggunaan dana disini..."
              value={form.data.description}
              onChange={(e) => form.setData("description", e.currentTarget.value)}
            />
            <FormErrorMessage>{form.errors?.description}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.funding_source_id)}>
            <FormLabel>Sumber Dana</FormLabel>
            <AsyncSelect
              isClearable
              placeholder="Pilih sumber dana disini."
              options={sourceOptions}
              onChange={(newValue) => {
                form.clearErrors("funding_source_id");

                form.setData("source", newValue);
              }}
            />
            <FormErrorMessage>{form.errors.funding_source_id}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.beneficiary_type_id)}>
            <FormLabel>Penerima Manfaat</FormLabel>
            <AsyncSelect
              isClearable
              placeholder="Pilih karyawan disini."
              options={beneficiaryOptions}
              onChange={(newValue) => {
                form.clearErrors("beneficiary_type_id");

                form.setData("beneficiary", newValue);
              }}
            />
            <FormErrorMessage>{form.errors.beneficiary_type_id}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.amount)}>
            <FormLabel>Nominal</FormLabel>
            <NumberInput
              inputMode="decimal"
              value={form.data.amount}
              onChange={(value) => form.setData("amount", value)}
            >
              <NumberInputField placeholder="Nominal penggunaan dana disini" />
            </NumberInput>
            <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button leftIcon={<Icon as={PlusSquare} />} type="submit" isLoading={form.processing}>
          Tambah Item
        </Button>
      </CardFooter>
    </Card>
  );
};
