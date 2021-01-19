import React from "react";
import { DataGrid } from "@material-ui/data-grid";
//import rawData from "./data/countryData.json";

export default function StatsGrid(props) {
  const { loading, data } = props;

  const rows =
    data &&
    data.rows
      .filter((row) => row.country && row.country !== "World")
      .map((row) => ({
        id: row.country,
        country: row.country,
        total_cases:
          row.total_cases === "N/A"
            ? "N/A"
            : Number(row.total_cases.replace(/,/g, "")),
        new_cases: Number(row.new_cases.replace(/,/g, "")),
        total_deaths: Number(row.total_deaths.replace(/,/g, "")),
        total_recovered:
          row.total_recovered === "N/A"
            ? "N/A"
            : Number(row.total_recovered.replace(/,/g, "")),
        active_cases: Number(row.active_cases.replace(/,/g, "")),
      }));

  const columns = [
    {
      field: "country",
      headerName: "Country",
      headerAlign: "left",
      flex: 1.5,
    },
    {
      field: "total_cases",
      headerName: "Total Cases",
      headerAlign: "right",
      flex: 1,
      type: "number",
    },
    {
      field: "new_cases",
      headerName: "New Cases",
      headerAlign: "right",
      flex: 1,
      type: "number",
    },
    {
      field: "total_deaths",
      headerName: "Total Deaths",
      headerAlign: "right",
      flex: 1,
      type: "number",
    },
    {
      field: "total_recovered",
      headerName: "Total Recovered",
      headerAlign: "right",
      flex: 1.2,
      type: "number",
    },
    {
      field: "active_cases",
      headerName: "Active Cases",
      headerAlign: "right",
      flex: 1,
      type: "number",
    },
  ];

  return loading ? (
    <>Loading...</>
  ) : (
    <DataGrid rows={rows} columns={columns} autoPageSize />
  );
}
