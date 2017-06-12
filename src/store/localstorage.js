const LocalEvent = function (item) {
  this.get = function () {
    return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : ''
  }

  this.set = function (obj) {
    sessionStorage.setItem(item, JSON.stringify(obj))
  }

  this.clear = function () {
    sessionStorage.removeItem(item)
  }
}

export const local = new LocalEvent('ls_data')
export const getDate = () => {
  const date = new Date()
  const mouth = parseInt(date.getMonth() + 1)
  return date.getFullYear() + '-' + mouth + date.getDate()
}
