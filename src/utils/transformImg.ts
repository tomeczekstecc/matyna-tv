export const transformImg = (img: string, width: number, height: number, zoom=1) => {
  return img.replace(/upload/, `upload/f_auto,w_${width},h_${height},z_${zoom}`)
}
