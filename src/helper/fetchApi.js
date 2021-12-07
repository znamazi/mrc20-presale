export const fetchApi = async (url, init) => {
  try {
    const resp = await fetch(url, init)
    return await resp.json()
  } catch (error) {
    console.log('fetch ' + url + ' had some error', error)
  }
}
