import React from 'react'
import { Flex } from 'rebass'
import { ChainStatus, LabelStatus } from '../../constants/constants'
import { presaleToken, title } from '../../constants/settings'
import { Box } from '../container/Container'
import { GradientTitle, Title } from '../text/Title'
// import InfoLeft from './InfoLeft'
import Chain from './Chain'
import { useSwap } from '../../state/swap/hooks'
import NetworkHint from '../common/NetworkHint'
import AmountBox from './AmountBox'
import { Container, TriangleDown } from './swap.style'
// import RemainedAllocation from './RemainedAllocation'

const Swap = () => {
  const totalTokenLeft = 15
  const lock = false

  const swap = useSwap()

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle>{title} </GradientTitle>
      <Title>Presale</Title>
      <Flex flexDirection="column" opacity={totalTokenLeft < 10 ? '0.3' : '1'} width="100%">
        {/* {lock && lockType === LockType.Allocation ? (
          <InfoLeft
            showTimeLeft={publicTime}
            setShowTimeLeft={() => setShowTimeLeft(publicTime)}
            totalTokenLeft={totalTokenLeft}
            publicTime={publicTime}
          />
        ) : Date.now() < holderPublicTime ? (
          <InfoLeft
            showTimeLeft={showTimeLeft}
            setShowTimeLeft={() => setShowTimeLeft(publicTime)}
            totalTokenLeft={totalTokenLeft}
            publicTime={publicTime}
          />
        ) : (
          <>
            {console.log('************************')}
            <InfoLeft
              showTimeLeft={publicTime}
              setShowTimeLeft={() => setShowTimeLeft(publicTime)}
              totalTokenLeft={totalTokenLeft}
              publicTime={publicTime}
            />
          </>
        )} */}

        <Container>
          <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
            <Flex width="100%" flexDirection="column">
              <Chain type={ChainStatus.ORIGIN_CHAIN} value={swap?.chain} lock={lock} />
              {swap.chain && <NetworkHint validChain={swap.chain.id} />}

              <AmountBox
                label={LabelStatus.FROM}
                amount={swap.amountFrom}
                selectedToken={swap.token}
                // changeToken={changeToken}
                // handleAmount={handleAmount}
                // handleMax={handleMax}
                // error={error}
                // lock={lock}
              />
            </Flex>
          </Box>
          <Box background="#f2f4fb" padding="0" borderRadius="0" border="none">
            <TriangleDown />
          </Box>
          <Box background="linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%)">
            <AmountBox
              label={LabelStatus.TO}
              amount={swap.amountTo}
              selectedToken={presaleToken}
              // handleAmount={handleAmount}
              // lock={lock}
            />
          </Box>
        </Container>
        {/* 
        {lock && lockType === LockType.Allocation
          ? remainedAllocation !== undefined &&
            Date.now() < publicTime && <RemainedAllocation remainedAllocation="Not eligible" />
          : remainedAllocation !== undefined &&
            Date.now() < holderPublicTime && <RemainedAllocation remainedAllocation={`$${remainedAllocation}`} />} */}
      </Flex>
    </Flex>
  )
}

export default Swap
