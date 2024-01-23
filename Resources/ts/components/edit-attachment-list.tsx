import { Card, CardBody, CardProps, Icon, CardFooter, Button } from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import { Save } from "react-feather";
import { AttachmentList } from "./attachment-list";

type EditAttachmentListCardProps = {
  utilization: Modules.Utilization.Models.Utilization;
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
  action?: (attachment: Ziswapp.Domain.Foundation.Model.File) => ReactNode | ReactElement;
} & CardProps;

export const EditAttachmentListCard = ({
  attachments,
  action,
  ...props
}: EditAttachmentListCardProps) => (
  <Card variant="outline" {...props}>
    <CardBody px={attachments.length <= 0 ? undefined : 0}>
      <AttachmentList attachments={attachments} action={action} />
    </CardBody>
    {attachments.length > 0 && (
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
