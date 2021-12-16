import React, { useState, useEffect } from 'react'
import moment from 'moment'

const CountDown = (props) => {
  const { date, setLock } = props
  // TODO change after Mr.teimori change mongodb

  const [timer, setTimer] = useState(moment(date).diff(moment()) + 60000)
  const [waiting, setWaiting] = useState()
  useEffect(() => {
    let dif = moment.duration(timer)
    let waitingTime = dif.days()
      ? [dif.days(), dif.hours(), dif.minutes(), dif.seconds()].join(':')
      : dif.hours()
      ? [dif.hours(), dif.minutes(), dif.seconds()].join(':')
      : [dif.minutes(), dif.seconds()].join(':')
    setWaiting(waitingTime)

    const interval = setInterval(() => {
      if (timer < 1000) {
        setLock(0)
        clearInterval(interval)
      } else {
        let newTime = timer - 1000
        setTimer(newTime)
        let dif = moment.duration(newTime)
        let waitingTime = dif.days()
          ? [dif.days(), dif.hours(), dif.minutes(), dif.seconds()].join(':')
          : dif.hours()
          ? [dif.hours(), dif.minutes(), dif.seconds()].join(':')
          : [dif.minutes(), dif.seconds()].join(':')
        setWaiting(waitingTime)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer])
  return <div>{waiting}</div>
}

export default CountDown
