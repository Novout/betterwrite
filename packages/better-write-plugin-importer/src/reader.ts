export const read = (file: File, type: 'data' | 'raw' | 'text') => {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    switch (type) {
      case 'raw':
        res(file)
        break
      case 'data':
        reader.readAsDataURL(file)
        break
      case 'text':
        reader.readAsText(file)
        break
    }

    reader.onload = async function () {
      res(reader.result)
    }
    reader.onerror = function (err) {
      rej()
    }
  })
}
