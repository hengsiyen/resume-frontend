const iframeId = 'iframeTalentPlus'

export default (context, reject) => {
  async function setLocalStorage (key, value) {
    localStorage.setItem(key, value)
    const iframe = document.getElementById(iframeId)
    const setValuePromise = new Promise((resolve) => {
      iframe.contentWindow.postMessage({
        action: 'set',
        key,
        value
      }, '*')
      resolve({ key, value })
    })
    return await setValuePromise
  }
  async function removeLocalStorage (key) {
    localStorage.removeItem(key)
    const iframe = document.getElementById(iframeId)
    const removeValuePromise = new Promise((resolve) => {
      iframe.contentWindow.postMessage({
        action: 'remove',
        key
      }, '*')
      resolve(key)
    })

    return await removeValuePromise
  }
  async function removeAllLocalStorages () {
    localStorage.clear()
    const iframe = document.getElementById(iframeId)
    const removeValuePromise = new Promise((resolve) => {
      iframe.contentWindow.postMessage({
        action: 'removeAll'
      }, '*')
      resolve([])
    })

    return await removeValuePromise
  }

  reject('setLocalStorage', setLocalStorage)
  reject('removeLocalStorage', removeLocalStorage)
  reject('removeAllLocalStorages', removeAllLocalStorages)

  context.$setLocalStorage = setLocalStorage
  context.$removeLocalStorage = removeLocalStorage
  context.$removeAllLocalStorages = removeAllLocalStorages
}
