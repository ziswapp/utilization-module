/* eslint-disable @typescript-eslint/no-explicit-any */
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
  IconButton,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  chakra
} from "@chakra-ui/react";
import { PageHeader } from "@ziswapp/components/page-header";
import { Select } from "@ziswapp/components/select";
import { useBranchSelectOption } from "@ziswapp/hooks";
import { AppLayout } from "@ziswapp/layouts";
import { useStatusSelectOption, useTypeSelectOption } from "../hooks/use-options";
import { Download } from "react-feather";
import { useForm } from "@inertiajs/react";
import { DatePickerField } from "@ziswapp/components/date-picker-field";
import { useDatePeriod } from "@ziswapp/hooks/use-date-period";
import { FormEventHandler } from "react";
import dayjs from "@ziswapp/utils/datetime";
import { CardGroup } from "@ziswapp/components/card";

interface PageProps {
  files: Array<any>;
}

const Page = (props: PageProps) => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePeriod();

  const { selected: branchSelected, options: branchOptions } = useBranchSelectOption();
  const { selected: typeSelected, options: typeOptions } = useTypeSelectOption();
  const { selected: statusSelected, options: statusOptions } = useStatusSelectOption();

  const form = useForm<any>({
    branch: branchSelected || null,
    type: typeSelected || null,
    status: statusSelected || null,
    start: startDate || null,
    end: endDate || null
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    form.transform((data: any) => {
      return {
        branch: data.branch?.value?.id || "",
        type: data.type?.value?.id || "",
        status: data.status?.value || "",
        start: dayjs(data.start).toISOString(),
        end: dayjs(data.end).toISOString()
      };
    });

    form.post("/utilization/export");
  };

  return (
    <AppLayout permission="menu.utilization.export">
      <PageHeader title="Penggunaan Dana" subtitle="Unduh data penggunaan dana disini." />
      <SimpleGrid gap={6}>
        <Card as={chakra.form} onSubmit={onSubmit}>
          <CardBody>
            <SimpleGrid gap={6} columns={2}>
              <FormControl isRequired isInvalid={Boolean(form.errors?.branch)}>
                <FormLabel>Cabang</FormLabel>
                <Select
                  isClearable
                  placeholder="Pilih cabang disini."
                  options={branchOptions}
                  value={form.data.branch}
                  onChange={(option) => {
                    form.setData((prevData: any) => ({ ...prevData, branch: option }));
                  }}
                />
                <FormErrorMessage>{form.errors?.branch}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={Boolean(form.errors?.start || form.errors?.end)}>
                <FormLabel>Tanggal</FormLabel>
                <DatePickerField
                  isClearable
                  selectsRange
                  shouldCloseOnSelect
                  popperProps={{
                    strategy: "fixed",
                    positionFixed: true
                  }}
                  placeholderText="Tanggal penggunaan disini"
                  selected={startDate}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  onChange={(date: [Date | null, Date | null]) => {
                    const [start, end] = date;

                    setStartDate(start);
                    setEndDate(end);

                    form.setData((prevData: any) => ({
                      ...prevData,
                      start,
                      end
                    }));
                  }}
                  monthsShown={2}
                />
                <FormErrorMessage>{form.errors?.start || form.errors?.end}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(form.errors?.type)}>
                <FormLabel>Jenis</FormLabel>
                <Select
                  isClearable
                  placeholder="Pilih jenis penggunaan dana disini."
                  value={form.data.type}
                  options={typeOptions}
                  onChange={(option) => {
                    form.setData((prevData: any) => ({ ...prevData, type: option }));
                  }}
                />
                <FormErrorMessage>{form.errors?.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(form.errors?.status)}>
                <FormLabel>Status</FormLabel>
                <Select
                  isClearable
                  placeholder="Pilih status disini."
                  options={statusOptions}
                  value={form.data.status}
                  onChange={(option) => {
                    form.setData((prevData: any) => ({ ...prevData, status: option }));
                  }}
                />
              </FormControl>
            </SimpleGrid>
          </CardBody>
          <CardFooter justifyContent="end">
            <Button leftIcon={<Icon as={Download} />} isLoading={form.processing} type="submit">
              Download
            </Button>
          </CardFooter>
        </Card>
        <VStack w="full" align="stretch" spacing={8}>
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>
              Apabila export yang baru di proses belum muncul, harap untuk menunggu beberapa saat
              lalu refresh page
            </AlertDescription>
          </Alert>
        </VStack>
        <Card>
          <VStack w="full" align="stretch" p={4} spacing={8}>
            <CardGroup title="Download" description="Downaload file export disini">
              <Alert status="info">
                <AlertIcon />
                <AlertDescription>Hanya 10 file terakhir yang bisa di download.</AlertDescription>
              </Alert>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nama File</Th>
                    <Th>Tanggal buat</Th>
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {props.files?.map((file: any) => (
                    <Tr key={file.uuid}>
                      <Td>{file.name}</Td>
                      <Td>{dayjs(file.created_at).format("DD MMM YYYY hh:mm")}</Td>
                      <Td isNumeric>
                        <IconButton
                          as="a"
                          size="xs"
                          aria-label="Download"
                          icon={<Icon as={Download} />}
                          href={`/file/d/${file.path}`}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardGroup>
          </VStack>
        </Card>
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
