import React from 'react'
import Map from '../map/map'
import { Hero } from '../hero'
import { Layout } from '../layout'
import { Theme } from '../globalStyles'
import { Counter } from '../counter'
import { Legends } from '../legends'
import { Targets } from '../targets'
import { HowTo } from '../howTo'

export const Main = () => {
    return (
        <Layout >
            <Theme />
            <Hero />
            <Map />
            <Legends />
            <Counter />
            <Targets />
            <HowTo />
        </Layout>
    )
}