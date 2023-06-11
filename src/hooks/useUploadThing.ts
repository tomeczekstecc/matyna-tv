import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/server/api/uploadthing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
