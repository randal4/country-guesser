import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

//const geoUrl =
//"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const calculateFill = (d, geo, selectedCountryIsoA2) => {
  if (selectedCountryIsoA2 === geo.properties.ISO_A2) {
    return "#F7E967";
  } else if (!d) {
    return "#ffffff";
  } else {
    return d.correct ? "#A9CF54" : "#F1433F";
  }
};

const MapChart = (props) => {
  const { loading, data, selectedCountryIsoA2, geoData } = props;

  const countryClicked = (geo) => (e) => {
    e.preventDefault();
    props.handleCountryClick(geo);
  };

  return loading ? (
    "Loading..."
  ) : (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <ZoomableGroup>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => {
                return s.country === geo.properties.ISO_A2;
              });
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={calculateFill(d, geo, selectedCountryIsoA2)}
                  stroke={"black"}
                  strokeWidth={
                    selectedCountryIsoA2 === geo.properties.ISO_A2 ? 1.5 : 0.5
                  }
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", strokeWidth: 1 },
                    pressed: { outline: "none", strokeWidth: 1 },
                  }}
                  onClick={countryClicked(geo.properties)}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
