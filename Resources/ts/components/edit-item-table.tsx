import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { ItemTable, ItemTableProps } from "./item-table";
import { Save, X } from "react-feather";
import { router } from "@inertiajs/react";

interface EditItemTableProps extends Pick<ItemTableProps, "items" | "action"> {
  utilization: Modules.Utilization.Models.Utilization;
}

export const EditItemTable = (props: EditItemTableProps) => {
  return (
    <Card>
      <CardBody p={props.items.length <= 0 ? undefined : 0}>
        <ItemTable
          items={props.items}
          action={(item) => (
            <ButtonGroup size="xs" variant="outline">
              <IconButton
                size="xs"
                aria-label="Delete"
                colorScheme="red"
                icon={<Icon as={X} />}
                onClick={(e) => {
                  e.preventDefault();

                  router.delete(`/utilization/item/${item.id}`);
                }}
              />
            </ButtonGroup>
          )}
        />
      </CardBody>
      {props.items.length > 0 && (
        <CardFooter justifyContent="end">
          <Button
            leftIcon={<Icon as={Save} />}
            onClick={(e) => {
              e.preventDefault();

              router.get(`/utilization/${props.utilization.id}`);
            }}
          >
            Selesai
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
