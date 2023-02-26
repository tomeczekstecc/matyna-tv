import {AxiosCloudinary} from "@/utils/axios";

export async function search(options = {}) {

  const params = {
    ...options,
  }
  // @ts-ignore
  if (options.next_cursor) {
    // @ts-ignore

    params.next_cursor = options.next_cursor
    // @ts-ignore

    delete params.nextCursor
  }

  const paramSting = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');


  const results = await AxiosCloudinary.get(`/resources/search?${paramSting}`)
  return results?.data
}

export function mapImages(resources: any) {
  return resources.map(({asset_id, public_id, secure_url, width, height}) => {
    return {
      id: asset_id,
      title: public_id,
      image: secure_url,
      width,
      height
    }
  })

}
