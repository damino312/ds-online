"use client";

import { useToast } from "@/_components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url: string) => void;
  endpoint: "imageUploader" | "messageFile";
  setIsLoading: (isLoading: boolean) => void;
}

const FileUpload = ({ endpoint, onChange, setIsLoading }: FileUploadProps) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      className="py-4"
      endpoint={endpoint}
      onBeforeUploadBegin={(files) => {
        setIsLoading(true);
        return files;
      }}
      onUploadBegin={() => setIsLoading(true)}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
        setIsLoading(false);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
