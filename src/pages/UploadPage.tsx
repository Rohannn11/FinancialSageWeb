
import { PageLayout } from "@/components/layout/PageLayout";
import { FileUploader } from "@/components/upload/FileUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, UploadCloud, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function UploadPage() {
  const [selectedTab, setSelectedTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesAccepted = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Upload Financial Data</h1>
        
        <Tabs defaultValue="upload" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Data Upload</CardTitle>
                  <CardDescription>
                    Upload your financial data in CSV or PDF format for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader
                    title="Upload Financial Documents"
                    description="Drag and drop your CSV or PDF files here"
                    allowedFileTypes={["application/pdf", "text/csv"]}
                    maxSize={10 * 1024 * 1024} // 10MB
                    onFilesAccepted={handleFilesAccepted}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Processing Options</CardTitle>
                  <CardDescription>
                    Configure how your uploaded files should be processed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="ocr"
                          className="h-4 w-4 mt-1 rounded border-gray-300"
                          defaultChecked
                        />
                        <div>
                          <label htmlFor="ocr" className="text-sm font-medium">
                            Use OCR for PDF documents
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Extract text from scanned documents using OCR technology
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="header"
                          className="h-4 w-4 mt-1 rounded border-gray-300"
                          defaultChecked
                        />
                        <div>
                          <label htmlFor="header" className="text-sm font-medium">
                            CSV has header row
                          </label>
                          <p className="text-xs text-muted-foreground">
                            First row of CSV files contains column names
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="anomaly"
                          className="h-4 w-4 mt-1 rounded border-gray-300"
                          defaultChecked
                        />
                        <div>
                          <label htmlFor="anomaly" className="text-sm font-medium">
                            Run anomaly detection
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Automatically detect unusual patterns in your data
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="forecast"
                          className="h-4 w-4 mt-1 rounded border-gray-300"
                          defaultChecked
                        />
                        <div>
                          <label htmlFor="forecast" className="text-sm font-medium">
                            Generate financial forecast
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Create projections based on historical data
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Process Files</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>
                  Recent file uploads and their processing status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length > 0 ? (
                  <div className="space-y-4">
                    {[...uploadedFiles].reverse().map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on {new Date().toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          {index % 3 === 0 ? (
                            <span className="flex items-center text-amber-500">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Processing
                            </span>
                          ) : (
                            <span className="flex items-center text-green-500">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Complete
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No files uploaded yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload files in the Upload tab to see them here
                    </p>
                    <Button onClick={() => setSelectedTab("upload")}>
                      Upload Files
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
