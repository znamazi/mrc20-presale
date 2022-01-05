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
    padding-top:50px;
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
  border-radius:  10px;
  /* display: flex;
  flex-direction: column;
  border-top: none;
  position: absolute;
  bottom: 10px; */
`
export const ContainerToken = styled(Flex)`
  /* height: 45px; */
  /* background: linear-gradient(270deg, #f8faff 0%, rgba(230, 236, 242, 0) 100%); */
  /* border-radius: 5px; */
  /* padding: 13px; */
`
export const Max = styled.div`
  background-color:#9c9bf3;
  align-items: center;
  border-radius: 5px;
  text-align:center;
  padding: 2px 4px;
  cursor: pointer;
  &:hover{
  background-color:#6f6dc5;
  div{
    color:#fff;
  }
  }
`
