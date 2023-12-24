export function setCookies(cookieString: string) {
  const cookies = cookieString.split(';;')
  cookies.forEach((cookie) => {
    document.cookie = cookie.trim()
  })
}
