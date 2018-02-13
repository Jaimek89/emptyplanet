import React, { Component } from 'react'
import ZoomMap from "./ZoomMap"

const wrapperStyles = {
  width: "980",
  maxWidth : "100%",
  margin: "0 auto",
  zIndex: -1
}

class BaseMap extends Component{
    constructor(props){
        super(props)
        this.state = {
            center: [0, 20],
            zoom: 1
        }
        /** */
        /******** Handler Zoom
         * */
        //this.handleZoomIn = this.handleZoomIn.bind(this)
        //this.handleZoomOut = this.handleZoomOut.bind(this)
    }
    
    /** */
    /************* Zoom Functions  
    /*** */
    handleZoomOut() {
        this.setState({ zoom: 1, center: [0, 0] })
    }
    handleCityClick(capital) {
        this.setState({ zoom: 5, center: capital.coordinates })
    }

    render(){
        return (
            <div style={wrapperStyles}>
                <ZoomMap center={this.state.center} zoom={this.state.zoom} countries={this.props.countries}/>
            </div> )
    }
}
export default BaseMap