
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  maxSize?: number; // in bytes
  allowedFileTypes?: string[];
  title?: string;
  description?: string;
  onFilesAccepted?: (files: File[]) => void;
  showPreview?: boolean;
  multiple?: boolean;
}

type FileWithPreview = File & {
  preview?: string;
  progress?: number;
  status?: "uploading" | "success" | "error";
  errorMessage?: string;
};

export function FileUploader({
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowedFileTypes = ["application/pdf", "text/csv"],
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
  onFilesAccepted,
  showPreview = true,
  multiple = true,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading" as const,
        })
      );

      if (onFilesAccepted) {
        onFilesAccepted(newFiles);
      }

      // Simulate upload progress
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      
      newFiles.forEach((file) => {
        const interval = setInterval(() => {
          setFiles((prevFiles) =>
            prevFiles.map((f) => {
              if (f.name === file.name && f.status === "uploading") {
                const progress = Math.min((f.progress || 0) + 10, 100);
                
                if (progress === 100) {
                  clearInterval(interval);
                  
                  // Simulate processing delay
                  setTimeout(() => {
                    setFiles((prevFiles) =>
                      prevFiles.map((f) =>
                        f.name === file.name
                          ? { ...f, status: "success" as const }
                          : f
                      )
                    );
                    
                    toast({
                      title: "File uploaded successfully",
                      description: `${file.name} has been processed`,
                      variant: "default",
                    });
                  }, 1000);
                }
                
                return { ...f, progress };
              }
              
              return f;
            })
          );
        }, 300);
      });
    },
    [onFilesAccepted, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
    },
    multiple,
  });

  const removeFile = (file: FileWithPreview) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer h-48",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted hover:border-primary/50 hover:bg-background/50"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className={cn("h-10 w-10 mb-2", isDragActive ? "text-primary" : "text-muted-foreground")} />
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Allowed file types: {allowedFileTypes.join(", ")} (Max size: {maxSize / (1024 * 1024)}MB)
        </p>
      </div>

      {showPreview && files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium">Uploaded files</h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center p-3 border rounded-md bg-background relative"
              >
                <div className="flex items-center flex-1">
                  <File className="h-8 w-8 mr-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate mb-0.5">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB ·{" "}
                      {file.status === "uploading"
                        ? "Processing..."
                        : file.status === "success"
                        ? "Complete"
                        : file.status === "error"
                        ? file.errorMessage || "Error"
                        : "Ready"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {file.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : file.status === "error" ? (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  ) : null}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {file.status === "uploading" && (
                  <Progress
                    value={file.progress}
                    className="h-1 absolute bottom-0 left-0 right-0 rounded-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
