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
import { useTypeSelectOption } from "../hooks/use-options";

export interface FilterFormProps {
  onFilter: (key: string, value: string) => void;
}

export const BeneficiaryFilterForm = (props: FilterFormProps) => {
  const { selected: userSelected, options: userOptions } = useUserSelectOption();
  const { selected: branchSelected, options: branchOptions } = useBranchSelectOption();
  const { selected: typeSelected, options: typeOptions } = useTypeSelectOption();

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
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
