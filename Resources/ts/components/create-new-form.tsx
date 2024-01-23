/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEventHandler, useMemo } from "react";
import { useForm } from "@inertiajs/react";
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
  Select,
  SimpleGrid,
  Textarea
} from "@chakra-ui/react";
import { ArrowRightCircle } from "react-feather";

import dayjs from "@ziswapp/utils/datetime";
import { Select as AsyncSelect } from "@ziswapp/components/select";
import { DatePickerField } from "@ziswapp/components/date-picker-field";
import { CardGroup } from "@ziswapp/components/card";
import { useUserSelectOption } from "@ziswapp/hooks";

import { useProgramSelectOption, useTypeSelectOption } from "../hooks/use-options";

type FormData = {
  type?: Record<string, any> | null;
  description: string;
  payment_type: string;
  use_at?: string;
  date?: Date | null;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  user?: string | null | Record<string, unknown>;
  user_id?: number | string;
  branch_id?: number | string;
  utilization_type_id?: number | string;

  program?: Record<string, any> | null;
  distribution_at?: string;
  distribution_date?: Date | null;
  distribution_program_id?: string;
  distribution_program_description?: string;
};

export const CreateNewForm = () => {
  const { options: userOptions } = useUserSelectOption();
  const { options: typeOptions } = useTypeSelectOption();
  const { options: programOptions } = useProgramSelectOption();

  const form = useForm<FormData>({
    type: null,
    description: "",
    use_at: "",
    date: null,
    payment_type: "transfer",
    bank_name: "",
    bank_account_number: "",
    bank_account_name: "",
    user: ""
  });

  const isTransfer = useMemo(() => form.data.payment_type === "transfer", [form.data]);
  const isDistribution = useMemo(() => form.data.type?.value?.is_distribution, [form.data]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    form.transform(
      ({ user, date, distribution_date, type, program, ...data }: FormData): FormData => {
        const { value: userValue } = user as Record<string, Record<string, string | number>>;
        const { value: typeValue } = type as Record<string, Record<string, string | number>>;

        return {
          ...data,
          use_at: date ? dayjs(date).format("YYYY-MM-DD") : "",
          user_id: userValue?.id || "",
          branch_id: userValue?.branch_id || "",
          utilization_type_id: typeValue?.id || "",
          distribution_at: date ? dayjs(distribution_date).format("YYYY-MM-DD") : "",
          distribution_program_id: program?.value?.id || ""
        };
      }
    );

    form.post("/utilization");
  };

  return (
    <Card variant="outline" as={chakra.form} onSubmit={onSubmit}>
      <CardBody>
        <SimpleGrid gap={6} columns={2}>
          <FormControl isRequired isInvalid={Boolean(form.errors.utilization_type_id)}>
            <FormLabel>Jenis penggunaan</FormLabel>
            <AsyncSelect
              placeholder="Pilih jenis penggunaan disini."
              options={typeOptions}
              onChange={(newValue) => {
                form.clearErrors("utilization_type_id");

                form.setData("type", newValue || "");
              }}
            />
            <FormErrorMessage>{form.errors.utilization_type_id}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.user_id)}>
            <FormLabel>Penggunaan atas nama</FormLabel>
            <AsyncSelect
              placeholder="Pilih karyawan disini."
              options={userOptions}
              onChange={(newValue) => {
                form.clearErrors("user_id");

                form.setData("user", newValue || "");
              }}
            />
            <FormErrorMessage>{form.errors.user_id}</FormErrorMessage>
          </FormControl>
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

          <FormControl isRequired isInvalid={Boolean(form.errors.use_at)}>
            <FormLabel>Tanggal penggunaan</FormLabel>
            <DatePickerField
              popperProps={{
                strategy: "fixed",
                positionFixed: true
              }}
              placeholderText="Tanggal penggunaan disini..."
              selected={form.data.date}
              maxDate={new Date()}
              dateFormat="dd MMM yyyy"
              onChange={(newDate: Date | null) => {
                form.setData((previousData: FormData) => ({
                  ...previousData,
                  date: newDate
                }));
              }}
            />
            <FormErrorMessage>{form.errors.use_at}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(form.errors.payment_type)}>
            <FormLabel>Jenis pembayaran</FormLabel>
            <Select
              defaultValue={form.data.payment_type}
              onChange={(e) => form.setData("payment_type", e.currentTarget.value)}
            >
              <chakra.option value="cash">Tunai</chakra.option>
              <chakra.option value="transfer">Transfer</chakra.option>
            </Select>
            <FormErrorMessage>{form.errors.payment_type}</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired={isTransfer}
            isDisabled={!isTransfer}
            isInvalid={Boolean(form.errors.bank_name)}
          >
            <FormLabel>Bank tujuan</FormLabel>
            <Input
              placeholder="Bank tujuan disini..."
              value={form.data.bank_name}
              onChange={(e) => form.setData("bank_name", e.currentTarget.value)}
            />
            <FormErrorMessage>{form.errors?.bank_name}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired={isTransfer}
            isDisabled={!isTransfer}
            isInvalid={Boolean(form.errors.bank_account_number)}
          >
            <FormLabel>Rekening tujuan</FormLabel>
            <Input
              placeholder="Rekening tujuan disini..."
              value={form.data.bank_account_number}
              onChange={(e) => form.setData("bank_account_number", e.currentTarget.value)}
            />
            <FormErrorMessage>{form.errors?.bank_account_number}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired={isTransfer}
            isDisabled={!isTransfer}
            isInvalid={Boolean(form.errors.bank_account_name)}
          >
            <FormLabel>Atas nama rekening</FormLabel>
            <Input
              placeholder="Atas nama rekening tujuan disini..."
              value={form.data.bank_account_name}
              onChange={(e) => form.setData("bank_account_name", e.currentTarget.value)}
            />
            <FormErrorMessage>{form.errors?.bank_account_name}</FormErrorMessage>
          </FormControl>
          {isDistribution && (
            <GridItem colSpan={2}>
              <CardGroup title="Penyaluran" description="Detail data penyaluran dana">
                <SimpleGrid columns={2} gap={6}>
                  <FormControl
                    isRequired={isDistribution}
                    isInvalid={Boolean(form.errors.distribution_at)}
                  >
                    <FormLabel>Tanggal penyaluran</FormLabel>
                    <DatePickerField
                      popperProps={{
                        strategy: "fixed",
                        positionFixed: true
                      }}
                      placeholderText="Tanggal penyaluran disini..."
                      selected={form.data.distribution_date}
                      maxDate={new Date()}
                      dateFormat="dd MMM yyyy"
                      onChange={(newDate: Date | null) => {
                        form.setData((previousData: FormData) => ({
                          ...previousData,
                          distribution_date: newDate
                        }));
                      }}
                    />
                    <FormErrorMessage>{form.errors.distribution_at}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired={isDistribution}
                    isInvalid={Boolean(form.errors.distribution_program_id)}
                  >
                    <FormLabel>Program</FormLabel>
                    <AsyncSelect
                      placeholder="Pilih program penyaluran"
                      options={programOptions}
                      onChange={(newValue) => {
                        form.clearErrors("distribution_program_id");

                        form.setData("program", newValue || "");
                      }}
                    />
                    <FormErrorMessage>{form.errors.distribution_program_id}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    colSpan={2}
                    as={GridItem}
                    isRequired={isDistribution}
                    isInvalid={Boolean(form.errors.distribution_program_description)}
                  >
                    <FormLabel>Deskripsi Program</FormLabel>
                    <Textarea
                      resize="none"
                      placeholder="Deskripsi program disini..."
                      value={form.data.distribution_program_description}
                      onChange={(e) =>
                        form.setData("distribution_program_description", e.currentTarget.value)
                      }
                    />
                    <FormErrorMessage>
                      {form.errors?.distribution_program_description}
                    </FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </CardGroup>
            </GridItem>
          )}
        </SimpleGrid>
      </CardBody>
      <CardFooter justifyContent="end">
        <Button
          rightIcon={<Icon as={ArrowRightCircle} />}
          type="submit"
          isLoading={form.processing}
        >
          Selanjutnya
        </Button>
      </CardFooter>
    </Card>
  );
};
