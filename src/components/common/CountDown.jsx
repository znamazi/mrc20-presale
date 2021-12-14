import React, { useState, useEffect } from 'react'
import moment from 'moment'

const CountDown = (props) => {
  console.log({ props })
  const { date, setLock } = props

  const [timer, setTimer] = useState(moment(date).diff(moment(new Date())))
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
      console.log({ timer })
      if (timer < 1000) {
        setLock(0)
        clearInterval(interval)
      }
      let newTime = timer - 1000
      setTimer(newTime)
      let dif = moment.duration(newTime)
      let waitingTime = dif.days()
        ? [dif.days(), dif.hours(), dif.minutes(), dif.seconds()].join(':')
        : dif.hours()
        ? [dif.hours(), dif.minutes(), dif.seconds()].join(':')
        : [dif.minutes(), dif.seconds()].join(':')
      setWaiting(waitingTime)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer])
  return <div>{waiting}</div>
}

export default CountDown
