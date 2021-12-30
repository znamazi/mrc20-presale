import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { diffTimeFormat } from '../../utils/time'

const CountDown = (props) => {
  const { date, setLock } = props

  // TODO change after Mr.teimori change mongodb

  const [timer, setTimer] = useState(moment(date).diff(moment()) + 60000)
  // const refDate = useRef(moment(date).format('x'))

  const [waiting, setWaiting] = useState()
  useEffect(() => {
    // if (moment(date).format('x') !== refDate) {
    //   clearInterval(interval)
    //   refDate = moment(date).format('x')
    //   setTimer(moment(date).diff(moment()) + 60000)
    // }
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
  }, [timer, date])
  return <div>{waiting}</div>
}

export default CountDown
