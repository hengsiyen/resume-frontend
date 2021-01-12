const iframeId = 'iframe'

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

  async function getLocalStorage (key) {
    const iframe = document.getElementById(iframeId)
    iframe.contentWindow.postMessage({
      action: 'get',
      key
    }, '*')

    const getValuePromise = new Promise((resolve) => {
      window.addEventListener('message', function (event) {
        if (event.data.action === 'returnLocalstorage') {
          resolve(event.data.value)
        }
      })
    })

    return await getValuePromise
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

  async function getAllLocalStorages () {
    if (window.origin === process.env.VUE_APP_URL) {
      return new Promise(resolve => resolve([]))
    }

    const iframe = document.getElementById(iframeId)
    iframe.contentWindow.postMessage({
      action: 'getAll'
    }, '*')

    const getAllValuesPromise = new Promise((resolve) => {
      window.addEventListener('message', function (event) {
        if (event.data.action === 'returnAllLocalstorage') {
          console.log('getAllValuesPromise')
          console.log(event.data.value)
          resolve(event.data.value)
        }
      })
    })

    return await getAllValuesPromise
  }

  reject('setLocalStorage', setLocalStorage)
  reject('getLocalStorage', getLocalStorage)
  reject('removeLocalStorage', removeLocalStorage)
  reject('getAllLocalStorages', getAllLocalStorages)
  reject('removeAllLocalStorages', removeAllLocalStorages)

  context.$setLocalStorage = setLocalStorage
  context.$getLocalStorage = getLocalStorage
  context.$removeLocalStorage = removeLocalStorage
  context.$removeAllLocalStorages = removeAllLocalStorages
}
