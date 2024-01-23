import { Button, FormControl, HStack, Icon, Input } from "@chakra-ui/react";
import { useLocation } from "@ziswapp/hooks";
import { useState } from "react";
import { Search } from "react-feather";

export interface SearchFormProps {
  onSubmit?: (keyword: string) => void;
}

export const BeneficiarySearchForm = ({ onSubmit }: SearchFormProps) => {
  const { params } = useLocation();
  const [keyword, setKeyword] = useState<string>(params?.q || "");

  return (
    <FormControl>
      <HStack>
        <Input
          value={keyword}
          placeholder="Cari menggunakan nama, nik atau nomor"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          leftIcon={<Icon as={Search} />}
          onClick={(e) => {
            e.preventDefault();

            onSubmit && onSubmit(keyword);
          }}
        >
          Cari
        </Button>
      </HStack>
    </FormControl>
  );
};
