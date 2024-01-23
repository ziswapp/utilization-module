import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  SimpleGrid
} from "@chakra-ui/react";
import { Select } from "@ziswapp/components/select";
import { useBranchSelectOption, useUserSelectOption } from "@ziswapp/hooks";
import { useStatusSelectOption, useTypeSelectOption } from "../hooks/use-options";
import { AmountRangeInput } from "./amount-range-input";
import { DateRangeInput } from "./date-range-input";

export interface FilterFormProps {
  onFilter: (key: string, value: string) => void;
}

export const FilterForm = (props: FilterFormProps) => {
  const { selected: userSelected, options: userOptions } = useUserSelectOption();
  const { selected: branchSelected, options: branchOptions } = useBranchSelectOption();
  const { selected: typeSelected, options: typeOptions } = useTypeSelectOption();
  const { selected: statusSelected, options: statusOptions } = useStatusSelectOption();

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Filter
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <SimpleGrid gap={6} columns={3}>
            <FormControl>
              <FormLabel>Karyawan</FormLabel>
              <Select
                isClearable
                placeholder="Pilih karyawan disini."
                options={userOptions}
                value={userSelected}
                onChange={(option) => {
                  props.onFilter("user", option?.value?.id || "");
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cabang</FormLabel>
              <Select
                isClearable
                placeholder="Pilih cabang disini."
                options={branchOptions}
                value={branchSelected}
                onChange={(option) => {
                  props.onFilter("branch", option?.value?.id || "");
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Jenis</FormLabel>
              <Select
                isClearable
                placeholder="Pilih jenis penggunaan dana disini."
                value={typeSelected}
                options={typeOptions}
                onChange={(option) => {
                  props.onFilter("type", option?.value?.id || "");
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                isClearable
                placeholder="Pilih status disini."
                options={statusOptions}
                value={statusSelected}
                onChange={(option) => {
                  props.onFilter("status", option?.value || "");
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tanggal</FormLabel>
              <DateRangeInput
                onFilter={(value) => {
                  props.onFilter("use_at", value || "");
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nominal</FormLabel>
              <AmountRangeInput
                onClear={() => props.onFilter("amount", "")}
                onFilter={(value) => props.onFilter("amount", value)}
              />
            </FormControl>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
