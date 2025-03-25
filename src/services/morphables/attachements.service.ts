import { AxiosResponse } from "axios";
import { _axios } from "../../interceptor/http-config";
import type { IAttachment } from "@/types/morphables/attatchement";

export const _MorphablesApi = {
  uploadAttachment: async (
    fileType: string,
    fileTypeId: number,
    file: File,
    storageDisk: string = "public"
  ) => {
    const formData = new FormData();
    formData.append("file_type", fileType);
    formData.append("file_type_id", fileTypeId.toString());
    formData.append("file", file);
    formData.append("storage_disk", storageDisk);

    const response = await _axios.post<AxiosResponse<IAttachment>>(
      "/morphables/attachments",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};
