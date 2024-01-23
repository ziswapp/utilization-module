/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserSelectOption } from "@ziswapp/hooks";
import { useProgramSelectOption, useTypeSelectOption } from "../hooks/use-options";
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
import { FormEventHandler, useMemo } from "react";
import { Save } from "react-feather";

import dayjs from "@ziswapp/utils/datetime";
import { Select as AsyncSelect } from "@ziswapp/components/select";
import { DatePickerField } from "@ziswapp/components/date-picker-field";
import { CardGroup } from "@ziswapp/components/card";

type EditFormData = {
  type?: Record<string, any> | null;
  description: string;
  payment_type: string;
  use_at?: string;
  date?: Date | null;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  user?: string | null | Record<string, any>;
  user_id?: string;
  branch_id?: string;
  utilization_type_id?: string;

  program?: Record<string, any> | null;
  distribution_date?: Date | null;

  distribution_at: string;
  distribution_program_id: string;
  distribution_program_description: string;
};

interface EditFormProps {
  utilization: Modules.Utilization.Models.Utilization;
}

export const EditForm = (props: EditFormProps) => {
  const { options: userOptions } = useUserSelectOption();
  const { options: typeOptions } = useTypeSelectOption();
  const { options: programOptions } = useProgramSelectOption();

  const useAt = dayjs(props.utilization.use_at);
  const distributionAt = dayjs(props.utilization.distribution_at);

  const form = useForm<EditFormData | any>({
    type: props.utilization.type
      ? {
          value: props.utilization.type,
          label: props.utilization.type.name
        }
      : null,
    description: props.utilization.description || "",
    use_at: useAt.format("YYYY-MM-DD"),
    date: useAt.toDate(),
    payment_type: props.utilization.payment_type || "transfer",
    bank_name: props.utilization.bank_name || "",
    bank_account_number: props.utilization.bank_account_name || "",
    bank_account_name: props.utilization.bank_account_number || "",
    user: props.utilization.user
      ? {
          value: props.utilization.user,
          label: props.utilization.user.name
        }
      : null,
    utilization_type_id: props.utilization.utilization_type_id || "",
    user_id: props.utilization.user_id || "",
    branch_id: props.utilization.branch_id || "",
    program: props.utilization.program
      ? {
          value: props.utilization.program,
          label: props.utilization.program.name
        }
      : null,
    distribution_at: props.utilization.distribution_at ? distributionAt.format("YYYY-MM-DD") : "",
    distribution_date: props.utilization.distribution_at ? distributionAt.toDate() : null,
    distribution_program_id: props.utilization.distribution_program_id || "",
    distribution_program_description: props.utilization.distribution_program_description || ""
  });

  const isTransfer = useMemo(() => form.data.payment_type === "transfer", [form.data]);
  const isDistribution = useMemo(() => form.data.type?.value?.is_distribution, [form.data]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    form.patch(`/utilization/${props.utilization.id}`);
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
              value={form.data.type}
              onChange={(newValue) => {
                form.clearErrors("utilization_type_id");

                form.setData("utilization_type_id", newValue?.value?.id || "");
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
              value={form.data.user}
              onChange={(newValue) => {
                form.clearErrors("user_id");

                form.setData("user_id", newValue?.value?.id || "");
                form.setData("branch_id", newValue?.value?.branch_id || "");
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
                  date: newDate,
                  use_at: dayjs(newDate).format("YYYY-MM-DD")
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
                          distribution_date: newDate,
                          distribution_at: dayjs(newDate).format("YYYY-MM-DD")
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
                      value={form.data.program}
                      onChange={(newValue) => {
                        form.clearErrors("distribution_program_id");

                        form.setData("program", newValue || "");
                        form.setData("distribution_program_id", newValue?.value?.id || "");
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
        <Button leftIcon={<Icon as={Save} />} type="submit" isLoading={form.processing}>
          Simpan
        </Button>
      </CardFooter>
    </Card>
  );
};
