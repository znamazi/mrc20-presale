import styled from 'styled-components'

export const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  height: ${({ height }) => (height ? height : '55px')};
  background: ${({ background }) => (background ? background : '#e7e8ea')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  border: ${({ border }) => (border ? border : 'transparent')};
  color: ${({ color }) => (color ? color : '#919191')};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  &:focus {
    outline: none;
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  height: ${({ height }) => (height ? height : '55px')};
  background: ${({ background }) => (background ? background : '#D7D7D7')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  border: ${({ border }) => (border ? border : 'transparent')};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  cursor: ${({ cursor }) => (cursor ? cursor : 'pointer')};
  &:focus {
    outline: none;
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

  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  box-sizing: border-box;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'FH Oscar')};
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
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '200px')};
  width: 100%;
  height: ${({ height }) => (height ? height : '40px')};
  border: ${({ border }) => (border ? border : '1px solid #e7e8ea')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '10px'};
  box-sizing: border-box;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'FH Oscar')};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  color: ${({ color }) => (color ? color : '#313144')};
  &:focus {
    outline: none;
  }
  padding: 0 17px;
  @media screen and (max-width: 576px) {
    font-size: ${({ fontSizeXS }) => (fontSizeXS ? fontSizeXS : '13px')};
    max-width: 150px;
  }
  @media screen and (max-width: 460px) {
    max-width: 120px;
    font-size: 10px;
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
  width: ${({ width }) => (width ? width : '26px')};
  height: ${({ height }) => (height ? height : '26px')};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '11px'};
  box-sizing: ${({ boxSizing }) => boxSizing};
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
