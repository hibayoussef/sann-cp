import { useUploadAttachment } from "@/hooks/prouducts/useAttatchement";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ComponentCard from "../../common/ComponentCard";

interface DropzoneComponentProps {
  id: number;
  initialImage: string | null;
  type: string | null;
  onUpload: (fileData: { id: number; image: string; type: string }) => void;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  id,
  initialImage,
  type,
  onUpload,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialImage
  );
  const [file, setFile] = useState<File | null>(null);
  const { mutate: uploadAttachment, isPending } = useUploadAttachment(
    type || "image/jpeg",
    id
  );

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setUploadedImage(url);
      setFile(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file_type", type || "image/jpeg");
      formData.append("file_type_id", id.toString());
      formData.append("file", file);
      formData.append("storage_disk", "public");

      const response: any = await uploadAttachment({ formData });
      const imageUrl = response?.data.url;
      setUploadedImage(imageUrl);

      onUpload({
        id,
        image: imageUrl,
        type: file.type,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ComponentCard title="Upload Image">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* قسم Drag and Drop */}
        <div className="flex-1 transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 h-full">
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-4 lg:p-6 h-full ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-900"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
            id="demo-upload"
          >
            <input {...getInputProps()} />
            <div className="dz-message flex flex-col items-center !m-0 h-full justify-center">
              <h4 className="mb-2 font-semibold text-gray-800 text-sm dark:text-white/90">
                {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
              </h4>
              <span className="text-center mb-3 block w-full max-w-[240px] text-xs text-gray-600 dark:text-gray-400">
                Drag and drop your PNG, JPG, WebP, SVG images here or browse
              </span>
              <span className="font-medium underline text-xs text-brand-500">
                Browse File
              </span>
            </div>
          </form>

          {/* عرض الصورة المبدئية إذا كانت موجودة */}
          {uploadedImage && (
            <div className="mt-3 flex items-center justify-center cursor-pointer">
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="h-32 w-32 object-cover rounded-lg"
                onClick={() => {
                  // عرض الصورة عند الضغط عليها
                  window.open(uploadedImage, "_blank");
                }}
              />
            </div>
          )}

          {file?.name && uploadedImage && (
            <div className="mt-3 flex items-center px-4 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400 mr-2">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 truncate">
                File: {file?.name}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-gray-900 dark:border-gray-700 h-full">
          <h3 className="text-sm font-semibold mb-3 dark:text-white">
            Image Specifications
          </h3>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <p>
              This logo will be displayed in transaction PDFs and email
              notifications.
            </p>
            <p>Preferred Dimensions: 240×240px @72DPI</p>
            <p>Max File Size: 1MB</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-full items-center">
        <button
          type="button"
          onClick={handleUpload}
          className="px-5 py-2 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#465FFF]  hover:bg-[#465FFF] flex items-center gap-2"
          disabled={isPending || !file}
        >
          {isPending ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <UploadIcon className="h-4 w-4 text-white " />
          )}
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;
