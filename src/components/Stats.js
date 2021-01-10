import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import rawData from "./data/countryData.json";

function compareCountries(a, b) {
  // Use toUpperCase() to ignore character casing
  const countryA = a.country.toUpperCase();
  const countryB = b.country.toUpperCase();

  let comparison = 0;
  if (countryA > countryB) {
    comparison = 1;
  } else if (countryA < countryB) {
    comparison = -1;
  }
  return comparison;
}

const rows = rawData.data.rows
  .filter((row) => row.country && row.country !== "World")
  .sort(compareCountries);

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Stats() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Stats</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Total Cases</TableCell>
            <TableCell align="right">New Cases</TableCell>
            <TableCell align="right">Total Deaths</TableCell>
            <TableCell align="right">Total Recovered</TableCell>
            <TableCell align="right">Active Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.country}>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.total_cases}</TableCell>
              <TableCell align="right">{row.new_cases}</TableCell>
              <TableCell align="right">{row.total_deaths}</TableCell>
              <TableCell align="right">{row.total_recovered}</TableCell>
              <TableCell align="right">{row.active_cases}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
