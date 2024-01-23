import {
  Box,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  HStack,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatNumber
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { CardGroup } from "@ziswapp/components/card";
import { DatePickerField } from "@ziswapp/components/date-picker-field";
import { Select } from "@ziswapp/components/select";
import { useBranchSelectOption, useLocation } from "@ziswapp/hooks";
import { useDatePeriod } from "@ziswapp/hooks/use-date-period";
import { AppLayout } from "@ziswapp/layouts";
import dayjs from "@ziswapp/utils/datetime";
import numberFormat from "@ziswapp/utils/number-format";
import QueryString from "qs";
import { useCallback } from "react";

import { SourceAmountChart } from "../components/source-amount-chart";
import { BeneficiaryAmountChart } from "../components/beneficiary-amount-chart";
import { TypeAmountChart } from "../components/type-amount-chart";

type Aggregate = {
  [key in "source" | "type" | "beneficiary"]: string;
} & {
  aggregate: number;
};

interface PageProps {
  usedAmount: number;
  amountBySource: Array<Aggregate>;
  amountByType: Array<Aggregate>;
  amountByBeneficiary: Array<Aggregate>;
}

const Page = (props: PageProps) => {
  const { params } = useLocation();
  const { startDate, endDate, setStartDate, setEndDate, period } = useDatePeriod();
  const { selected: branchSelected, options: branchOptions } = useBranchSelectOption({
    branchId: params.branch || ""
  });

  const onBranchChange = useCallback(
    (value: number) => {
      const newParams = { ...params, branch: value || "" };

      router.get(`/utilization/dashboard?${QueryString.stringify(newParams)}`);
    },
    [params]
  );

  const onDateChange = useCallback(
    (value: { start: null | string | number; end: null | string | number }) => {
      const newParams = { ...params, start: value.start, end: value.end };

      router.get(`/utilization/dashboard?${QueryString.stringify(newParams)}`);
    },
    [params]
  );

  return (
    <AppLayout permission="menu.utilization.dashboard">
      <Card>
        <CardHeader as={HStack} justify="space-between" spacing={4}>
          <FormControl>
            <Select
              isClearable
              placeholder="Pilih cabang disini."
              value={branchSelected}
              options={branchOptions}
              onChange={(option) => {
                onBranchChange(option?.value?.id || "");
              }}
            />
          </FormControl>
          <FormControl>
            <DatePickerField
              isClearable
              selectsRange
              shouldCloseOnSelect
              popperProps={{
                strategy: "fixed",
                positionFixed: true
              }}
              placeholderText="Tanggal transaksi disini..."
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              dateFormat="dd MMM yyyy"
              onChange={(date: [Date | null, Date | null]) => {
                const [start, end] = date;

                setStartDate(start);
                setEndDate(end);

                if (start == null && end === null) {
                  onDateChange({ start, end });
                }
              }}
              monthsShown={2}
              onClickOutside={() => {
                const start = startDate ? dayjs(startDate).toISOString() : "";
                const end = endDate ? dayjs(endDate).toISOString() : "";

                onDateChange({ start, end });
              }}
            />
          </FormControl>
        </CardHeader>
        <CardBody as={SimpleGrid} gap={6}>
          <Box border="1px" borderRadius="lg" borderColor="gray.300" p={4}>
            <CardGroup
              pt={2}
              title="Total penggunaan"
              description="Total deposit yang sudah disetorkan"
            >
              <Stat>
                <StatNumber fontSize="4xl">{numberFormat(props.usedAmount)}</StatNumber>
                {period && <StatHelpText>{period}</StatHelpText>}
              </Stat>
            </CardGroup>
          </Box>
          <Box border="1px" borderRadius="lg" borderColor="gray.300" p={4}>
            <CardGroup
              title="Sumber dana dan penerima manfaat"
              description="Total nominal penggunaan dana berdasarkan sumber dana dan penerima manfaat"
            >
              <SimpleGrid gap={4} columns={2}>
                <SourceAmountChart data={props.amountBySource} />
                <BeneficiaryAmountChart data={props.amountByBeneficiary} />
              </SimpleGrid>
            </CardGroup>
          </Box>
          <Box border="1px" borderRadius="lg" borderColor="gray.300" p={4}>
            <CardGroup
              title="Jenis penggunaan dana"
              description="Total nominal penggunaan dana berdasarkan jenis penggunaan"
            >
              <TypeAmountChart data={props.amountByType} />
            </CardGroup>
          </Box>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default Page;
