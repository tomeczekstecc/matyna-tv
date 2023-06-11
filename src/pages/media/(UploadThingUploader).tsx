import {OurFileRouter} from "@/server/api/uploadthing";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {FileWithPath, useDropzone} from "react-dropzone";
import {useUploadThing} from "@/hooks/useUploadThing";
import {LoadingSpinner} from "@/components/loading";
import toast from "react-hot-toast";
import {Edit, Trash, UploadCloud, UploadCloudIcon, UploadIcon} from "lucide-react";

const UploadThingUploader = () => {


  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);


  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  // @ts-ignore

  const {startUpload, isUploading, permittedFileInfo} = useUploadThing<string>({
    endpoint: "imageUploader", // replace this with an actual endpoint name
    onClientUploadComplete: () => {
      setFiles([])
      toast.success("Pliki przesłane pomyślnie");
    },
    onUploadError: () => {
      console.log(permittedFileInfo, "permittedFileInfo")
      // @ts-ignore
      toast.error(`Wystąpił błąd podczas przesyłania plików. Możesz przesłać maksymalnie ${permittedFileInfo.config.image.maxFileCount} pliki jednocześnie, o rozmiarze nie większym niż ${permittedFileInfo.config.image.maxFileSize} każdy.`);
    },
  });


  return (
    <div>
      {/*<UploadDropzone<OurFileRouter>*/}
      {/*  endpoint="imageUploader"*/}
      {/*  onClientUploadComplete={(res) => {*/}
      {/*    // Do something with the response*/}
      {/*    console.log("Files: ", res);*/}
      {/*    alert("Upload Completed");*/}
      {/*  }}*/}
      {/*  onUploadError={(error: Error) => {*/}
      {/*    alert(`ERROR! ${error.message}`);*/}
      {/*  }}*/}
      {/*/>*/}

      <div
        className={'h-100 mt-6 flex h-52 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 cursor-pointer'} {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          {files.length > 0 && (
            <Button
              disabled={isUploading}
              onClick={(e) => {
                e.stopPropagation()
                startUpload(files)
              }}>
              {isUploading && <LoadingSpinner size={16}/>}
              Prześlij {files.length} plik(i)
            </Button>
          )}
        </div>
        {!files.length && <Button variant={'ghost'} className={'py-8 px-10'} ><UploadCloudIcon className={'h-12 w-12'}/></Button> }
        {!files.length ? <div>Przeciągnij plik tutaj lub kliknij w to pole, aby wybrać plik(i) do przesłania</div>
          :
          <div>
            {files.map((file, i) => (
              <div>
                <div className={'text-sm font-bold flex items-center gap-2'} key={i}>{file.name}

                  <Trash className={'h-3 w-3.5 cursor-pointer text-red-500'} onClick={(e) => {
                    e.stopPropagation()
                    setFiles(files.filter((f) => f.name !== file.name))
                  }}/>
                </div>
              </div>
            ))}
          </div>


        }
      </div>
    </div>

  );
}

export default UploadThingUploader
