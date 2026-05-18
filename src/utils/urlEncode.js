export function urlEncode(url) {
  let res = ''
  for (const segment of url.split('/')) {
    if (segment !== '') res += '/' + encodeURIComponent(segment)
  }
  return res
}
