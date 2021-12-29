import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { diffTimeFormat } from '../../utils/time'

const CountDown = (props) => {
  const { date, setLock } = props
  const [waiting, setWaiting] = useState()

  // TODO change after Mr.teimori change mongodb
  if (date) {
    const [timer, setTimer] = useState(moment(date).diff(moment()) + 60000)
    useEffect(() => {
      let dif = moment.duration(timer)
      let waitingTime = diffTimeFormat(dif)
      setWaiting(waitingTime)

      const interval = setInterval(() => {
        if (timer < 1000) {
          setLock(0)
          clearInterval(interval)
        } else {
          let newTime = timer - 1000
          setTimer(newTime)
          let dif = moment.duration(newTime)
          let waitingTime = diffTimeFormat(dif)
          setWaiting(waitingTime)
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }, [timer])
  }

  return <div>{waiting}</div>
}

export default CountDown
