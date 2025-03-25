// useAttatchement.ts
import { _MorphablesApi } from "@/services/morphables/attachements.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/queryKeys";

export const useUploadAttachment = (fileType: string, fileTypeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const file = formData.get("file") as File;
      const storageDisk = formData.get("storage_disk") as string;

      return _MorphablesApi.uploadAttachment(
        fileType,
        fileTypeId,
        file,
        storageDisk
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTATCHEMENTS, fileType, fileTypeId],
      });
    },
  });
};
