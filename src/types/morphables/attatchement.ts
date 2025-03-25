import type { FileType, StorageDisk } from "../enums/attatchementType";

export interface IAttachment {
  file_type: FileType;
  file_type_id: number;
  file: File; 
  storage_disk: StorageDisk;
}
