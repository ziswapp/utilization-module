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
import { ArrowRightCircle, X } from "react-feather";
import { router } from "@inertiajs/react";

interface NewItemTableProps extends Pick<ItemTableProps, "items" | "action"> {
  utilization: Modules.Utilization.Models.Utilization;
}

export const NewItemTable = (props: NewItemTableProps) => {
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
            rightIcon={<Icon as={ArrowRightCircle} />}
            onClick={(e) => {
              e.preventDefault();

              router.get(
                props.utilization.type.is_distribution
                  ? `/utilization/${props.utilization.id}/beneficiary/new`
                  : `/utilization/${props.utilization.id}/attachment/new`
              );
            }}
          >
            Selanjutnya
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
