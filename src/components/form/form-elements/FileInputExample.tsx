import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useUploadAttachment } from "@/hooks/prouducts/useAttatchement";

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

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append("file_type", type || "image/jpeg");
      formData.append("file_type_id", id.toString());
      formData.append("file", file);
      formData.append("storage_disk", "public");

      // تنفيذ طلب الرفع
      const response = await uploadAttachment({ formData });
      
      // تحديث الحالة برابط الصورة من الاستجابة
      const imageUrl = response.data.url; // تأكد من أن الاستجابة تحتوي على رابط الصورة
      setUploadedImage(imageUrl);
      
      // تمرير البيانات للأب
      onUpload({ 
        id, 
        image: imageUrl, 
        type: file.type 
      });

    } catch (error) {
      console.error("Upload failed:", error);
      // يمكنك إضافة إشعار خطأ هنا
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ComponentCard title="Upload Image">
      <div className="flex gap-4 h-full">
        {/* قسم Drag and Drop */}
        <div className="flex-1 transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 h-full">
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-4 lg:p-6 h-full ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
            id="demo-upload"
          >
            <input {...getInputProps()} />
            <div className="dz-message flex flex-col items-center !m-0 h-full justify-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>

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

        <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-full">
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
          className="ml-auto px-3 py-1.5 bg-blue-500 text-xs text-white rounded hover:bg-blue-600 transition-colors h-fit disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file }
        >
          Upload
          {/* {isUploading ? 'Uploading...' : 'Upload'} */}
        </button>
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;
