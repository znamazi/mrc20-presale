import React from 'react'

import { Paragraph, RemainedAllocationContainer } from './swap.style'

const RemainedAllocation = ({ remainedAllocation }) => {
  return (
    <RemainedAllocationContainer>
      <Paragraph fontSize="10px" href="#">
        Your Presale Allocation
      </Paragraph>
      <Paragraph fontSize="13px" fontWeight="bold">
        {remainedAllocation}
      </Paragraph>
    </RemainedAllocationContainer>
  )
}

export default RemainedAllocation
