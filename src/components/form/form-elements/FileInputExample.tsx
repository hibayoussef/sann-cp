import { FC, useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";
import { useUploadAttachment } from "@/hooks/prouducts/useAttatchement";

interface FileInputExampleProps {
  fileType: string;
  fileTypeId: number;
  imageUrl?: string; // إضافة خاصية جديدة لتلقي رابط الصورة
}

const FileInputExample: FC<FileInputExampleProps> = ({
  fileType,
  fileTypeId,
  imageUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null); // حالة جديدة لتخزين رابط الصورة
  const uploadAttachment = useUploadAttachment(fileType, fileTypeId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file_type", fileType);
      formData.append("file_type_id", fileTypeId.toString());
      formData.append("file", file);
      formData.append("storage_disk", "public");

      await uploadAttachment.mutateAsync({ formData });
      setUploadedImageUrl(URL.createObjectURL(file)); // تحديث رابط الصورة بعد الرفع
    }
  };

  // استخدام useEffect لتحديث رابط الصورة عند تلقيه من الـ props
  useEffect(() => {
    if (imageUrl) {
      setUploadedImageUrl(imageUrl);
    }
  }, [imageUrl]);

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
        <button
          onClick={handleUpload}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          disabled={!file}
        >
          Upload File
        </button>
        {uploadedImageUrl && ( // عرض الصورة إذا كانت موجودة
          <div className="mt-4">
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </ComponentCard>
  );
};

export default FileInputExample;
