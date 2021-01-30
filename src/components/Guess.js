import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  detailsContext: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default function Guess({ data, currentGuess }) {
  const classes = useStyles();

  return data ? (
    <div className={classes.detailsContext}>
      <div>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          style={{ letterSpacing: ".4em" }}
        >
          {currentGuess + "_".repeat(data.NAME.length - currentGuess.length)}
        </Typography>
      </div>
    </div>
  ) : (
    <Typography variant="h3" align="center" color="primary">
      Click a country to guess!
    </Typography>
  );
}
