import React from "react";
import { Box, Typography, LinearProgress } from "@material-ui/core";
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

/*
{
          country: selectedCountryData.ISO_A2,
          correct:
            guessedCountry.toUpperCase() ===
            selectedCountryData.NAME.toUpperCase(),
        },
*/

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box minWidth={200} pr={3}>
        <Typography variant="h6" align="right">
          {props.typeLabel}
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Scorebar({ guessedCountries, totalNumberOfCountries }) {
  const classes = useStyles();
  const correctGuessedCountries = guessedCountries.filter((guess) => {
    return guess.correct === true;
  }).length;

  const guessedCorrectPercentage = Math.floor(
    (correctGuessedCountries / totalNumberOfCountries) * 100
  );
  const wrongGuessedCountries = guessedCountries.filter((guess) => {
    return guess.correct === false;
  }).length;

  const guessedWrongPercentage = Math.floor(
    (wrongGuessedCountries / guessedCountries.length) * 100
  );

  const totalGuesses = correctGuessedCountries + wrongGuessedCountries;

  return guessedCountries ? (
    <Box pt={3}>
      <div className={classes.guessTextBox}>
        <LinearProgressWithLabel
          value={(correctGuessedCountries / totalGuesses) * 100}
          label={correctGuessedCountries + "/" + totalGuesses}
          typeLabel="Guess %"
        />
      </div>
      <div className={classes.guessTextBox}>
        <LinearProgressWithLabel
          value={guessedCorrectPercentage}
          label={correctGuessedCountries + "/" + totalNumberOfCountries}
          typeLabel="Total Progress"
        />
      </div>
    </Box>
  ) : (
    <></>
  );
}
