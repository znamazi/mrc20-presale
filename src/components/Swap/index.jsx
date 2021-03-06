import React from 'react'
import { Flex } from 'rebass'
import { ChainStatus, LabelStatus, LockType } from '../../constants/constants'
import { title } from '../../constants/settings'
import { Box } from '../container/Container'
import { GradientTitle, Title } from '../text/Title'
import InfoLeft from './InfoLeft'
import Chain from './Chain'
import { useSwap } from '../../state/swap/hooks'
import NetworkHint from '../common/NetworkHint'
import AmountBox from './AmountBox'
import { Container, TriangleDown } from './swap.style'
import { useAppState, useUpdateShowTimeLeft } from '../../state/application/hooks'
import useTokensList from '../../hook/useTokensList'
import RemainedAllocation from './RemainedAllocation'

const Swap = (props) => {
  const { leftTokens } = props
  const { lock, lockType, publicTime, holderPublicTime, showTimeLeft, allocation } = useAppState()
  const updateShowTimeLeft = useUpdateShowTimeLeft()
  const swap = useSwap()
  const { tokens, presaleToken } = useTokensList()

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <GradientTitle>{title} </GradientTitle>
      <Title>Presale</Title>
      <Flex flexDirection="column" opacity={leftTokens < 10 ? '0.3' : '1'} width="100%">
        {lock && lockType === LockType.Allocation ? (
          <InfoLeft
            showTimeLeft={publicTime}
            setShowTimeLeft={() => updateShowTimeLeft(publicTime)}
            leftTokens={leftTokens}
            publicTime={publicTime}
          />
        ) : Date.now() < holderPublicTime ? (
          <InfoLeft
            showTimeLeft={showTimeLeft}
            setShowTimeLeft={() => updateShowTimeLeft(publicTime)}
            leftTokens={leftTokens}
            publicTime={publicTime}
          />
        ) : (
          <>
            <InfoLeft
              showTimeLeft={publicTime}
              setShowTimeLeft={() => updateShowTimeLeft(publicTime)}
              leftTokens={leftTokens}
              publicTime={publicTime}
            />
          </>
        )}

        <Container>
          <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 100%)">
            <Flex width="100%" flexDirection="column">
              <Chain type={ChainStatus.ORIGIN_CHAIN} value={swap?.chain} lock={lock} />
              {swap.chain && <NetworkHint validChain={swap.chain.id} />}

              <AmountBox
                label={LabelStatus.FROM}
                amount={swap.amountFrom}
                selectedToken={swap.token}
                tokens={tokens}
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
          <Box background="linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%)" padding="0 20px 20px">
            <AmountBox
              label={LabelStatus.TO}
              amount={swap.amountTo}
              selectedToken={presaleToken}
              // handleAmount={handleAmount}
              // lock={lock}
            />
          </Box>
        </Container>

        {lock && lockType === LockType.Allocation
          ? allocation !== undefined &&
            Date.now() < publicTime && <RemainedAllocation remainedAllocation="Not eligible" />
          : allocation !== undefined &&
            Date.now() < holderPublicTime && <RemainedAllocation remainedAllocation={`$${allocation}`} />}
      </Flex>
    </Flex>
  )
}

export default Swap
