import { Flex, Box } from 'rebass'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding: 40px 20px;
  justify-content: space-between;
  /* & > * {
    padding: 10px;
  } */
  @media screen and (max-width: 1200px) {
    // display: none !important;
    flex-direction: column;
    padding: 20px 5px;
  }

  @media screen and (max-width: 780px) {
    // display: none !important;
    flex-direction: column;
    padding: 0 20px;
    padding-top: 50px;
  }
`

export const ClaimWrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};

  @media screen and (max-width: 1200px) {
    margin: 20px auto 0 auto !important;
  }
`

export const Wrapper = styled(Box)`
  max-width: ${({ maxWidth }) => maxWidth};
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #313144;
  font-family: ${({ fontFamily }) => fontFamily};
  margin: ${({ margin }) => margin};
  /* @media screen and (max-width: 1200px) {
    display: none !important;
  }
  @media screen and (max-width: 576px) {
    font-size: 17px;
  } */
`

export const GradientTitle = styled.div`
  font-weight: bold;
  font-size: 35px;
  line-height: 30px;
  margin: ${({ margin }) => margin};
  font-family: ${({ fontFamily }) => fontFamily};
  background: -webkit-linear-gradient(10deg, #5551ff 0%, #d08f85 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const TriangleDown = styled.div`
  width: 0;
  height: 0;
  /* border-left: 116px solid transparent;
  border-right: 116px solid transparent;
  border-top: 24px solid #d3dbe3; */
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-top: 14px solid #d3dbe3;
`

export const BoxPresaleToken = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  /* height: 190px; */
  background: linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%);
  border-radius: 10px;
  /* display: flex;
  flex-direction: column;
  border-top: none;
  position: absolute;
  bottom: 10px; */
`
export const ContainerToken = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
`
export const Max = styled.div`
  background-color: #9c9bf3;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  padding: 2px 4px;
  cursor: pointer;
  &:hover {
    background-color: #6f6dc5;
    div {
      color: #fff;
    }
  }
`
export const ModalItem = styled.div`
  background: #2b2b3c;
  border: 1px solid rgba(172, 175, 243, 0.29);
  margin: 7.5px auto;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #42425f;
  }
`

export const Paragraph = styled.p`
  font-size: ${(fontSize) => fontSize};
  font-weight: ${(fontWeight) => fontWeight};
`

export const RemainedAllocationContainer = styled(Flex)`
  background-color: #d8dfe6;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  margin-top: 2px;
`
