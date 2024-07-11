import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const {useUploadThing} = generateReactHelpers<OurFileRouter>();
export const uploaadButton = generateUploadButton<OurFileRouter>();
export const uploaadDropzpne = generateUploadDropzone<OurFileRouter>();