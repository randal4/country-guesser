import React from "react";
import { Typography, FormControl, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  guessWrapper: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
  },
  guessTextBox: {
    border: "0px",
    fontSize: "3vw",
    minWidth: "100%",
    letterSpacing: ".5em",
    color: theme.palette.primary.main,
    spellcheck: false,
    caretColor: "transparent",
    textAlign: "center",
  },
}));

export default function Guess({ data, currentGuess }) {
  const classes = useStyles();

  console.log("data.NAME", data.NAME);
  console.log("data.NAME.length", data.NAME.length);
  console.log("currentGuess.length", currentGuess.length);

  const handleOnClick = () => {};

  return data ? (
    <div className={classes.guessWrapper} onClick={handleOnClick}>
      <FormControl style={{ width: "100%" }}>
        <input
          type="text-area"
          spellcheck="false"
          id="guessText"
          className={classes.guessTextBox}
          value={
            currentGuess + "_".repeat(data.NAME.length - currentGuess.length)
          }
        />
      </FormControl>
    </div>
  ) : (
    <Typography variant="h3" align="center" color="primary">
      Click a country to guess!
    </Typography>
  );
}
