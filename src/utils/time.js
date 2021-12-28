import moment from 'moment'

export const add24Hours = (startTime) => {
  console.log('******', startTime)
  return moment(startTime).add(24, 'hours')
}

export const diffTimeFormat = (dif) => {
  const diffFormat = dif.days()
    ? [
        dif.days().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.hours().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.minutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.seconds().toLocaleString(undefined, { minimumIntegerDigits: 2 })
      ].join(':')
    : dif.hours()
    ? [
        dif.hours().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.minutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.seconds().toLocaleString(undefined, { minimumIntegerDigits: 2 })
      ].join(':')
    : [
        dif.minutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }),
        dif.seconds().toLocaleString(undefined, { minimumIntegerDigits: 2 })
      ].join(':')

  return diffFormat
}
