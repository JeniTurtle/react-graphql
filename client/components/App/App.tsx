import React from 'react'

import ContainerStyle from './app.style'

interface IProps {
  fullPage?: boolean
  children?: any
}

const App = ({ children }: IProps) => (
  <ContainerStyle>{children}</ContainerStyle>
)

export default App
