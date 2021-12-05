import { Flex, Box } from 'rebass'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 40px;
  justify-content: space-between;
  & > * {
    padding: 10px;
  }
  @media screen and (max-width: 1200px) {
    // display: none !important;
    flex-direction: column;
    padding: 20px 5px;
  }
`

export const Wrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};
`
export const Title = styled.div`
  font-family: Reckless;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 25px;
  text-align: center;
  color: #5f5cfe;
  margin: ${({ margin }) => margin};
  @media screen and (max-width: 1200px) {
    display: none !important;
  }
  @media screen and (max-width: 576px) {
    font-size: 17px;
  }
`
