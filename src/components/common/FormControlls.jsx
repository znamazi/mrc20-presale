import styled from 'styled-components'
import { Flex } from 'rebass'

export const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => background ?? '#E6ECF2'};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : '1px solid #ffffff')};
  color: ${({ color }) => color ?? '#E6ECF2'};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  &:focus {
    outline: none;
  }
  &:hover {
    filter: brightness(0.9);
  }
`
export const Arrow = styled.img`
  cursor: pointer;
`
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '390px')};
  width: 100%;
  height: ${({ height }) => (height ? height : '45px')};
  background: ${({ background }) => (background ? background : '#D7D7D7')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: ${({ border }) => (border ? border : 'transparent')};
  margin: ${({ margin }) => margin};
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};

  &:hover {
    filter: ${({ cursor }) =>
      cursor === 'pointer' ? 'brightness(1.075)' : 'brightness(1)'};
  }

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 460px) {
    max-width: 330px;
  }
`
export const BorderBottom = styled.div`
  border-bottom: ${({ border }) =>
    border ? border : '0.5px solid rgba(210, 210, 210, 0.5)'};
`
export const Select = styled.select`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '200px')};
  width: 100%;
  height: ${({ height }) => (height ? height : '40px')};
  border: ${({ border }) => (border ? border : '1px solid #838995')};
  background: ${({ background }) => (background ? background : '#838995')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '2px')};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
  color: ${({ color }) => (color ? color : '#ffffff')};
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    box-shadow: 0px 0px 10px #636f87;
  }
  padding: 0 17px;
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '16px')};
    max-width: 150px;
  }
  @media screen and (max-width: 460px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '14px')};
    max-width: 110px;
    ::placeholder {
      font-size: 10px;
    }
  }
  ::placeholder {
    color: #909090;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
  }
`

export const Input = styled.input`
  width: 100%;
  background: ${({ background }) => (background ? background : 'transparent')};
  height: ${({ height }) => (height ? height : '45px')};
  border: ${({ border }) => (border ? border : '1px solid transparent')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  color: ${({ color }) => (color ? color : '#313144')};
  &:focus {
    outline: none;
  }
  padding-right: 15px;
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '13px')};
    max-width: 150px;
  }
  @media screen and (max-width: 460px) {
    max-width: 120px;
    /* font-size: 10px; */
  }
  ::placeholder {
    color: #909090;
    opacity: 1; /* Firefox */
    font-size: 13px;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #909090;
    font-size: 13px;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #909090;
    font-size: 13px;
  }
`
export const Image = styled.img`
  width: ${({ width }) => width ?? '26px'};
  height: ${({ height }) => height ?? '26px'};
  padding-right: ${({ paddingRight }) => paddingRight ?? '0'};
  margin-right: ${({ mr }) => mr ?? '0'};
`
export const ImageWithCursor = styled(Image)`
  cursor: pointer;
`
export const Link = styled.a`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;
  font-weight: 400;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`
export const ImageSpin = styled.img`
  padding: 0 10px;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
export const ContentItem = styled(Flex)`
  cursor: pointer;
`
