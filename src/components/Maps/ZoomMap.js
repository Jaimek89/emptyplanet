import React from 'react'
import { Motion, spring } from "react-motion"
import GeometryMap from './GeometryMap'

function ZoomMap(props) {
    return (
        <Motion
            defaultStyle={{ zoom: 1, x: 0,  y: 20, }}
            style={{
                    zoom: spring(props.zoom, { stiffness: 181, damping: 40 }),
                    x: spring(props.center[0], { stiffness: 181, damping: 40 }),
                    y: spring(props.center[1], { stiffness: 181, damping: 40 }),
                }}
        >
        {({ zoom, x, y }) => ( <GeometryMap center={props.center} zoom={props.zoom} countries={props.countries}/> )}
        </Motion>
    )
}

export default ZoomMap