export const serialize = (data) => {

  const baseUrl = `https://www.reddit.com`
  const compiled = {}

  compiled.id = data.id
  compiled.title = data.title || ""
  compiled.author = data.author || data.name || ""
  compiled.picture = data.url || data.banner_img || data.header_img || data.icon_img || "http://i.imgur.com/lqHeX.jpg"
  compiled.thumbnail = data.thumbnail || ""
  compiled.score = data.score || data.subscribers || 0
  compiled.description = data.description || ""
  compiled.creation = calcTime(data.created_utc)
  compiled.url = data.permalink ? baseUrl + data.permalink : data.url  

  return compiled
}

export const pluralize = (num, words) => {
  
  if (Math.floor(num) === 1) {
    return num + ` ${words}`

  } else {
    return num + ` ${words}s`
  }
}

export const calcTime = (utcTime) => {

  let time = ((new Date().getTime() - new Date(utcTime * 1000)) / (1000 * 60 * 60))

  if (time > 24) {

    time = ((new Date().getTime() - new Date(utcTime * 1000)) / (1000 * 60 * 60 * 24)).toFixed(0)
    return pluralize(time, `day`) + ` ago`

  } else if (time < 1) {

    time = ((new Date().getTime() - new Date(utcTime * 1000)) / (1000 * 60)).toFixed(0)
    return pluralize(time, `minute`) + ` ago`

  } else {

    time = time.toFixed(0)
    return pluralize(time, `hour`) + ` ago`
  }
}