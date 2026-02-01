export const urlEncode = (url) => {
    let res = ""
    for (let u of url.split("/")) {
        if (u != "") res += "/" + encodeURIComponent(u)
    }
    return res
}