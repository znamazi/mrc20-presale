import React from 'react'
import { ContainerToken } from './swap.style'
import { Image } from '../common/FormControlls'
import { Type } from '../text/Text'

const Token = (props) => {
  const { logo, name } = props
  return (
    <ContainerToken alignItems="center">
      <Image src={logo} height={'22px'} mr="5px" boxSizing="unset" alt={name} paddingRight="5px" />
      <Type.MD color="#ffffff">{name}</Type.MD>
    </ContainerToken>
  )
}

export default Token
