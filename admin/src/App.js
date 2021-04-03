import React from 'react'
import { ThemeProvider } from 'styled-components'
import Map from './components/map/map'
import { Layout } from './components/layout'
import { Theme } from './components/globalStyles'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{fontFamily: 'Helvetica Neue'}}>
        <Layout >
          <Theme />
          <Map />
        </Layout>
      </ThemeProvider>

    );
  }
}

