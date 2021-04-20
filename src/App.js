import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Main } from './components/main/main'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
        <Main />
      </ThemeProvider>

    );
  }
}

