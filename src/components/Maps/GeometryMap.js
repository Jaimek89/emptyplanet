/**
 *  Libraries and related resources used are Open Source or Public Domain CC
 * 
 *  react-simple-maps to make SVG maps
 * 
 *  {\*https://www.react-simple-maps.io/ *\}
 *
 *  d3-geo for render the spatial projection ( data visualization) of map
 * 
 *  {\*https://www.react-simple-maps.io/ *\}
 * 
 *  react-motion to make world animations
 * 
 *  {\*https://github.com/chenglou/react-motion*\}
 * 
 *  shapefile maps source from Natural Earth site
 *
 * {\*http://www.naturalearthdata.com/downloads/110m-cultural-vectors/*\}
 * 
 *   {\* And also chachis_110m.json Map 1:110 scale converted from shp and dbx to TopoJSON using mapshaper \*}
 *
 *  {\* http://mapshaper.org/  *\}
 * 
 */

import React from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

import geoObject from "./static/chachis_110m.json"

function GeometryMap(props){
  console.log(props.countries)
  return (
    <ComposableMap
              projectionConfig={{ scale: 205 }}
              width= {980}
              height={551}
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <ZoomableGroup center={props.center} zoom={props.zoom}>
                <Geographies geography={geoObject}>
                  {(geographies, projection) =>
                    geographies.map((geography, i) => geography.id !== -1 && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#6B5B95",
                            stroke: "transparent",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#FEFE5C",
                            stroke: "#FEFE5C",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#FEFE5C",
                            stroke: "#FEFE5C",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                        }}
                      />))}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
  )
}
export default GeometryMap