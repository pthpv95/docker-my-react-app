import moment from "moment"

export const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=")
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : ""
          return params
        }, {})
    : {}
}

export const formatTime = time => moment(time).format("h:mm a")

function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues)
}

function updateArray(arrays, newItem) {
  return [...arrays, newItem]
}

function updateItemInArray(array, itemId, updateItemCallback, key) {
  const updatedItems = array.map(item => {
    if (item[key] !== itemId) {
      return item
    }

    const updatedItem = updateItemCallback(item)
    return updatedItem
  })

  return updatedItems
}
export { updateItemInArray, updateObject }
