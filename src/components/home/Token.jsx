import React from 'react'
import { ContainerToken } from '.'
import { Image } from '../common/FormControlls'
import { Type } from '../common/Text'

const Token = (props) => {
  const { logo, name } = props
  return (
    <ContainerToken alignItems="center">
      <Image src={logo} boxSizing="unset" alt={name} />
      <Type.LG color="#313144" fontSize="15px" fontFamily="Montserrat-bold">
        {name}
      </Type.LG>
    </ContainerToken>
  )
}

export default Token
