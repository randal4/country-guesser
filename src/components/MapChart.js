import React, { useEffect, useState } from "react";
import { scaleThreshold } from "d3-scale";
import { schemeBlues } from "d3-scale-chromatic";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import rawData from "./data/countryData.json";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleThreshold()
  .domain([100, 1000, 5000, 100000, 250000, 500000, 1000000])
  .range(schemeBlues[8]);

const MapChart = (props) => {
  const [data, setData] = useState([]);

  const countryClicked = (geo) => (e) => {
    console.log(geo);
    props.handleCountryClick(geo);
  };

  useEffect(() => {
    console.log(rawData);
    setData(rawData.data.rows);
  }, []);

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147,
      }}
    >
      <ZoomableGroup>
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => {
                  return s.country_abbreviation === geo.properties.ISO_A2;
                });
                if (d) {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        d
                          ? colorScale(d.total_cases.replace(/,/g, ""))
                          : "#F5F4F6"
                      }
                      stroke={"black"}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", strokeWidth: 1 },
                        pressed: { outline: "none", strokeWidth: 1 },
                      }}
                      onClick={countryClicked(geo.properties)}
                    />
                  );
                } else {
                  console.log(
                    "country not found in data list",
                    geo.properties.ISO_A2
                  );
                  return null;
                }
              })
            }
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
