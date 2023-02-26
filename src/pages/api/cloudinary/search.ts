import {NextApiRequest, NextApiResponse} from "next";
import {search} from "@/lib/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = req.body
  const results = await search(params)
  res.status(200).json({...results})

}
