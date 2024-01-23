import {
  Menu,
  MenuButton,
  Input,
  MenuList,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  HStack,
  ButtonGroup,
  Button
} from "@chakra-ui/react";
import { useAmountRangeInputValue } from "@ziswapp/hooks";
import { useMemo, useState } from "react";

export interface AmountRangeInputProps {
  onFilter?: (value: string) => void;
  onClear?: () => void;
}

export const AmountRangeInput = (props: AmountRangeInputProps) => {
  const [filterStartAmount, fliterEndAmount] = useAmountRangeInputValue({
    key: "amount"
  });
  const [startAmount, setStartAmount] = useState<string | number>(filterStartAmount || "");
  const [endAmount, setEndAmount] = useState<string | number>(fliterEndAmount || "");

  const amountValue = useMemo(() => {
    if (filterStartAmount !== undefined && filterStartAmount !== null && filterStartAmount !== "") {
      return `${filterStartAmount} - ${fliterEndAmount}`;
    }

    return "";
  }, [filterStartAmount, fliterEndAmount]);

  return (
    <Menu isLazy matchWidth>
      {({ onClose }) => (
        <>
          <MenuButton as="div">
            <Input
              placeholder="Nominal transaksi disini"
              onKeyDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              value={amountValue}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          </MenuButton>
          <MenuList px={4} py={4}>
            <SimpleGrid gap={4}>
              <NumberInput
                inputMode="decimal"
                value={startAmount}
                onChange={(value) => setStartAmount(value)}
              >
                <NumberInputField placeholder="Nominal mulai dari" />
              </NumberInput>
              <NumberInput
                inputMode="decimal"
                value={endAmount}
                onChange={(value) => setEndAmount(value)}
              >
                <NumberInputField placeholder="Nominal sampai dengan" />
              </NumberInput>
              <HStack justify="end">
                <ButtonGroup variant="outline" size="sm">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      props.onClear && props.onClear();
                      onClose();
                    }}
                  >
                    Hapus
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();

                      const validStartAmount = startAmount !== "" || startAmount !== null;
                      const validEndAmount = endAmount !== "" || endAmount !== null;

                      if (validStartAmount && validEndAmount) {
                        const amount = `${startAmount},${endAmount}`;

                        props.onFilter && props.onFilter(amount);
                      }

                      onClose();
                    }}
                  >
                    Filter
                  </Button>
                </ButtonGroup>
              </HStack>
            </SimpleGrid>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
