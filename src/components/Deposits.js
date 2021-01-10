import React from "react";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import rawData from "./data/countryData.json";

const worldData = rawData.data.rows.find((data) => data.country === "World");

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    justifyContent: "end",
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>World Total Cases</Title>
      <Typography align="center" component="p" variant="h4" gutterBottom>
        {worldData.total_cases}
      </Typography>
      <Divider />
      <Title>New Cases</Title>
      <Typography align="center" component="p" variant="h4" gutterBottom>
        {worldData.new_cases}
      </Typography>
      <Divider />
      <Title>Total Recovered</Title>
      <Typography align="center" component="p" variant="h4" gutterBottom>
        {worldData.total_recovered}
      </Typography>
      <Divider />
      <Title>Active Cases</Title>
      <Typography align="center" component="p" variant="h4" gutterBottom>
        {worldData.active_cases}
      </Typography>
    </React.Fragment>
  );
}
