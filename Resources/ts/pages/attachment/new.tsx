import { Icon, IconButton, SimpleGrid, useToast } from "@chakra-ui/react";
import { PageHeader } from "@ziswapp/components/page-header";
import { AppLayout } from "@ziswapp/layouts";
import { X } from "react-feather";
import { router } from "@inertiajs/react";

import { SimpleInfoCard } from "../../components/simple-info";
import { NewAttachmentForm } from "../../components/new-attachment-form";
import { NewAttachmentListCard } from "../../components/new-attachment-list";

type PageProps = {
  utilization: Modules.Utilization.Models.Utilization;
  attachments: Array<Ziswapp.Domain.Foundation.Model.File>;
};

const Page = ({ utilization, attachments }: PageProps) => {
  const toast = useToast();

  const onDeleteItem = (file: Partial<Ziswapp.Domain.Foundation.Model.File>) => {
    router.delete(`/utilization/${utilization.id}/attachment/${file.uuid}`, {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Lampiran berhasil di hapus",
          status: "success"
        });
      }
    });
  };

  return (
    <AppLayout permission="action.utilization.create">
      <PageHeader title="Lampiran" subtitle="Hapus atau edit lampiran penggunaan dana disini." />
      <SimpleGrid gap={6}>
        <SimpleInfoCard utilization={utilization} />
        <NewAttachmentForm utilization={utilization} />
        {attachments.length > 0 && (
          <NewAttachmentListCard
            utilization={utilization}
            attachments={attachments}
            action={(attachment) => (
              <IconButton
                aria-label="Delete"
                variant="outline"
                size="xs"
                icon={<Icon as={X} />}
                colorScheme="red"
                onClick={(e) => {
                  e.preventDefault();

                  onDeleteItem(attachment);
                }}
              />
            )}
          />
        )}
      </SimpleGrid>
    </AppLayout>
  );
};

export default Page;
