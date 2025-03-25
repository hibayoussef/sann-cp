import { _MorphablesApi } from "@/services/morphables/attachements.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../utils/queryKeys";

// UPLOAD ATTACHMENT
export const useUploadAttachment = (fileType: string, fileTypeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      _MorphablesApi.uploadAttachment(
        fileType,
        fileTypeId,
        formData.get("file") as File,
        formData.get("storage_disk") as string
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ATTATCHEMENTS, fileType, fileTypeId],
      });
    },
  });
};
