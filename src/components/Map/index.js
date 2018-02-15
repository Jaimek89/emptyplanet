import React, { Component } from 'react'
/** */
/*  LIBRARIES
/*** */
import { Motion , spring  } from 'react-motion'
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from 'react-simple-maps'
/** */
/*  RESOURCES , STORES , STYLES
/** */
import geoObject from './static/chachis_110m.json'
import {
    fillStyles,
    projectionConfigs,
    composableStyle,
    baseHeight,
    baseWidth
} from '../stores/storeMap'
import '../styles/Map.css'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            center: [0, 0],
            zoom: 1,
        }
    }
    
    handlerNewCoords = (xy) => this.setState({ zoom : 4 , center: xy })
    /**
     * 
     *  On receive new props, compares if property zoom is established on 1,
     *  otherwise applies zoom changing state trough call handler
     * 
     * **/ 
    componentWillReceiveProps = (props) =>  props.zoom === 1 || this.handlerNewCoords( props.newCoords )
                                           
      
    render() {
        return (
            /**
             * 
             * Top level applies coordinates and zoom interpolation to child Composable Map
             * The 'defaultStyle' and 'style' are NOT styles itself, they refers to 
             *  new values passed to this objects, CAN'T be renamed without recode libray.   
             *  Author of 'react-motion' is adviced about this is confused in library specs.
             */
            <Motion
                defaultStyle={{ zoom: 1, x: 0, y: 20 }}
                style={{ 
                         zoom: spring( this.state.zoom,      { stiffness: 187, damping: 40 }),
                            x: spring( this.state.center[0], { stiffness: 187, damping: 40 }),
                            y: spring( this.state.center[1], { stiffness: 187, damping: 40 }) }}>
                {({ zoom, x, y }) => (
                    /**
                     * 
                     * This child group (ComposableMap) 
                     * composes (creates) the GIS map given in {geObject} imported
                     * in geoJSON format and apply properties over each shape(Geography)
                     * inside group (Zoomable)
                     */
                    <ComposableMap
                        projectionConfig = {{ projectionConfigs }}
                        width  = { baseWidth }
                        height = { baseHeight }
                        style  = {{ composableStyle }} >
                        <ZoomableGroup center = {[ x, y ]} zoom = { zoom } disablePanning = { true }>
                            <Geographies geography={ geoObject }>
                                {( geographies, projection ) =>
                                        geographies.map(( geography, i ) => 
                                        (
                                        <Geography
                                            id = { geography.properties.ADM0_A3 }
                                            key = { i }
                                            geography =  { geography  }
                                            projection = { projection }
                                            style={{
                                                    default: { ...fillStyles },
                                                    hover  : { ...fillStyles },
                                                    pressed: { ...fillStyles } }} />
                                        )
                                )}
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                )}
            </Motion>          
        )
    }
}
export default Map
