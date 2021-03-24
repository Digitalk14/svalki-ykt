import React from 'react'
import Map from './components/map/map'
import { Hero } from './components/hero'
import { Layout } from './components/layout'
import { Theme } from './components/globalStyles'
import { ThemeProvider } from 'styled-components'
import { Counter } from './components/counter'
import { Legends } from './components/legends'
import { Targets } from './components/targets'
import { HowTo } from './components/howTo'

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{fontFamily: 'Helvetica Neue'}}>
        <Layout >
          <Theme />
          <Hero />
          <Map />
          <Legends />
          <Counter />
          <Targets />
          <HowTo />
        </Layout>
      </ThemeProvider>

    );
  }
}

