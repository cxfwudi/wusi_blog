//unicode转字符串方法
export const unicodeToStr = (unicode: string) => {
  return unicode.replace(/\\u([\dA-Fa-f]{4})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16)))
}