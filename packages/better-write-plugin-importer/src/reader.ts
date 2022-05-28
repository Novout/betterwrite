export const read = (file: File, type: 'data' | 'text') => {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    switch (type) {
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
