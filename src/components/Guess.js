import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  guessTextBox: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default function Guess({ data, currentGuess }) {
  const classes = useStyles();

  console.log("data.NAME", data.NAME);
  console.log("data.NAME.length", data.NAME.length);
  console.log("currentGuess.length", currentGuess.length);

  return data ? (
    <div className={classes.guessTextBox}>
      <Typography
        variant="h3"
        align="center"
        color="primary"
        style={{ letterSpacing: ".4em" }}
      >
        {currentGuess + "_".repeat(data.NAME.length - currentGuess.length)}
      </Typography>
    </div>
  ) : (
    <Typography variant="h3" align="center" color="primary">
      Click a country to guess!
    </Typography>
  );
}
