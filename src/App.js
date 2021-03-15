import React from 'react'
import Map from './components/map/map'
import { Hero } from './components/hero'
import { Layout } from './components/layout'
import { theme } from './components/globalStyles'
import { ThemeProvider } from 'styled-components'
import { Counter } from './components/counter'
import { Legends } from './components/legends'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout >
          <Hero />
          <Map />
          <Legends />
          <Counter />
        </Layout>
      </ThemeProvider>

    );
  }
}

