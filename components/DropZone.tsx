import { useUploadThing } from '@/utils/uploadthing';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

function UploadSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
}

function LoadingSpinnerSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" />
    </svg>
  );
}

type DropProps = {
  setPodcastURL:Dispatch<SetStateAction<string>>,
  setImageURL:Dispatch<SetStateAction<string>>
}
export default function MyDropzone({setPodcastURL,setImageURL}:{ setPodcastURL:Dispatch<SetStateAction<string>>,
  setImageURL:Dispatch<SetStateAction<string>>}) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, permittedFileInfo } = useUploadThing(
    "mediaPost",
    {
      onClientUploadComplete: () => {
        toast.success("Upload completed successfully!");
      },
      onUploadError: (error) => {
        toast.error("An error occurred during upload");
        console.error(error);
      },
      onUploadBegin: () => {
        toast.info("Upload has started");
      },
    }
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          const binaryStr = reader.result;
          console.log(binaryStr);
        };
        reader.onloadend = async () => {
          console.log('file reading has ended');
          try {
            const result = await startUpload([file]);
            console.log("uploaded files", result);
            console.log( result);
            if(!result) throw new Error('no results')
            if(result[0].type==="image/jpeg" ){
             setImageURL(result[0].url);
            }
            if(result[0].type==="audio/mpeg"){
              setPodcastURL(result[0].url)
              
      
            }
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, open } = useDropzone({ noClick: true, onDrop });

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    try {
      const result = await startUpload(selectedFiles);
      console.log("uploaded files", result);
      console.log( result);
      if(!result) throw new Error('no results')
      if(result[0].type==="image" ){
       setImageURL(result[0].url);
      }
      if(result[0].type==="audio"){
      setPodcastURL(result[0].url)

      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center mb-10 border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition"
    >
      <input {...getInputProps()} onChange={handleOnChange} />
      <svg
        className="w-12 h-12 text-gray-400 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 7v4a1 1 0 001 1h3m10 10H7a2 2 0 01-2-2V7a2 2 0 012-2h3.5a1 1 0 01.7.3l.6.6a1 1 0 00.7.3H17a2 2 0 012 2v10a2 2 0 01-2 2z"
        />
      </svg>
      <p className="text-gray-600 mb-2">Drag 'n' drop some files here, or click to select files</p>
      <button
        type="button"
        onClick={open}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Open
      </button>
    </div>
  );
}
