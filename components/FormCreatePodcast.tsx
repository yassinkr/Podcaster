// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
"use client";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import  MyDropzone  from "./DropZone";
import { insertPodcast } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 

const formSchema = z.object({
    podcastTitle: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    Description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
  });

  function LoadingSpinnerSvg() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" className="spinner_ajPY" />
      </svg>
    );
  }

export function FormCreatePodcast() {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
 
  const { startUpload, permittedFileInfo } = useUploadThing(
    "podcast",
    {
      onClientUploadComplete: () => {
        toast("Upload complete!");
        router.refresh();
          },
      onUploadError: () => {
        toast.dismiss("upload_begin");
        toast.error("Upload failed");
          },
      onUploadBegin: () => {
        toast(<div className="flex gap-2 text-white items-center"><LoadingSpinnerSvg /><span className="text-lg">Uploading...</span></div>);
    },
    },
  );
 
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [PodcastURL, setPodcastURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      Description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    console.log("submitting");
    
  }
  return (
    <section className="mt-10 flex flex-col">
      <h1 className='text-xl font-bold text-white-1'>Create Podcast</h1>
      <Form {...form}>
      <form   onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-12 flex flex-col w-full">
      <div className="flex flex-col gap-[30px] bordr-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Podcast Title </FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="القوة تتكلم" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Description </FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col  ">
          <MyDropzone setPodcastURL={setPodcastURL} setImageURL={setImageURL}/>
    
            <div className="">
              <Button type="submit"  className="text-base w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                {isLoading ? (<><Loader size={20} className="animate-spin ml-2" /> Submitting </>) : ("Submit & Publish Podcast")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
    
  );
}