import {
  Table,
  Alert,
  AlertIcon,
  AlertDescription,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Card,
  CardBody,
  CardProps,
  Link,
  Icon,
  HStack,
  Text
} from "@chakra-ui/react";
import { ReactElement, ReactNode, useMemo } from "react";
import { ExternalLink } from "react-feather";

export type AttachmentListProps = {
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
  action?: (attachment: Ziswapp.Domain.Foundation.Model.File) => ReactNode | ReactElement;
};

export const AttachmentList = ({ attachments, action }: AttachmentListProps) => {
  const renderAlert = useMemo(
    () => (
      <Alert status="warning">
        <AlertIcon />
        <AlertDescription>Tidak ada file yang dilampirkan.</AlertDescription>
      </Alert>
    ),
    []
  );

  const renderTable = useMemo(
    () => (
      <Table>
        <Thead>
          <Tr>
            <Th>Lampiran</Th>
            {action && <Th />}
          </Tr>
        </Thead>
        <Tbody>
          {attachments.map((attachment: Ziswapp.Domain.Foundation.Model.File) => (
            <Tr key={attachment.id}>
              <Td>
                <Link
                  isExternal
                  href={`/file/v/${attachment.path}`}
                  _hover={{
                    textDecoration: "none"
                  }}
                >
                  <HStack spacing={2}>
                    <Text>{attachment.name}</Text>
                    <Icon as={ExternalLink} />
                  </HStack>
                </Link>
              </Td>
              {action && <Td isNumeric>{action(attachment)}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    ),
    [attachments]
  );

  return attachments.length <= 0 ? renderAlert : renderTable;
};

type AttachmentListCardProps = {
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
  action?: (attachment: Ziswapp.Domain.Foundation.Model.File) => ReactNode | ReactElement;
} & CardProps;

export const AttachmentListCard = ({ attachments, action, ...props }: AttachmentListCardProps) => (
  <Card variant="outline" {...props}>
    <CardBody px={attachments.length <= 0 ? undefined : 0}>
      <AttachmentList attachments={attachments} action={action} />
    </CardBody>
  </Card>
);
