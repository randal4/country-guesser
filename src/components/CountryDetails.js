import React from "react";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetailsStat from "./DetailsStat";

const useStyles = makeStyles({
  detailsContext: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  flagContainer: {
    height: "150px",
    width: "220px",
    margin: "auto",
  },
  flagImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    padding: "5px",
    display: "block",
    margin: "auto",
  },
});

export default function CountryDetails({ data }) {
  const classes = useStyles();
  return data ? (
    <div className={classes.detailsContext}>
      <div>
        <Typography variant="h3" align="center" color="primary">
          {data.country}
        </Typography>
      </div>
      <div className={classes.flagContainer}>
        <img
          className={classes.flagImage}
          src={data.flag}
          alt={`${data.country} flag`}
        ></img>{" "}
      </div>
      <Divider />
      <DetailsStat
        title={`${data.country} Total Cases`}
        content={data.total_cases}
      />
      <Divider />
      <DetailsStat title="New Cases" content={data.new_cases} />
      <Divider />
      <DetailsStat title="Total Recovered" content={data.total_recovered} />
      <Divider />
      <DetailsStat title="Active Cases" content={data.active_cases} />
    </div>
  ) : (
    <></>
  );
}
