import React from 'react'
import { ContainerToken } from '.'
import { Image } from '../common/FormControlls'
import { Type } from '../common/Text'

const Token = (props) => {
  const { logo, name } = props
  return (
    <ContainerToken alignItems="center">
      <Image src={logo} height={"22px"} mr="5px" boxSizing="unset" alt={name} />
      <Type.LG color="#ffffff" fontSize="15px" >
        {name}
      </Type.LG>
    </ContainerToken>
  )
}

export default Token
