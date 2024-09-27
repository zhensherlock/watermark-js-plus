export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const base64ToBuffer = (base64Image: string) => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  return Buffer.from(base64Data, 'base64')
}
