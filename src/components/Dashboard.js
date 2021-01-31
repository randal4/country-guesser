import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Grid, Paper, AppBar, Toolbar, Typography } from "@material-ui/core";
import MapChart from "./MapChart";
import Guess from "./Guess";
import RecentGuesses from "./RecentGuesses";
import geoData from "./data/geoData.json";
import Scorebar from "./Scorebar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "grey",
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 640,
  },
  guessHeight: {
    height: 200,
    marginBottom: 30,
    padding: 10,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [selectedCountryData, setSelectedCountryData] = React.useState();
  const [guessedCountries, setGuessedCountries] = React.useState([]);
  const [guessNumber, setGuessNumber] = React.useState(1);
  const [countryGuessText, setCountryGuessText] = useState("");
  const [recentGuessList, setRecentGuessList] = useState([]);

  const getRandomUnguessedCountry = useCallback(() => {
    const min = 0;
    const max = geoData.objects.ne_110m_admin_0_countries.geometries.length - 1;

    while (true) {
      const randomCountryNumber = Math.floor(min + Math.random() * (max - min));
      const randomCountryData =
        geoData.objects.ne_110m_admin_0_countries.geometries[
          randomCountryNumber
        ].properties;

      const alreadyGuessedCountry = guessedCountries.find(
        (alreadyGuessedCountry) => {
          return randomCountryData.ISO_A2 === alreadyGuessedCountry.country;
        }
      );

      if (!alreadyGuessedCountry) {
        console.log("Not Guessed: ", randomCountryData.NAME);
        return randomCountryData;
      }
      console.log("Already Guessed: ", randomCountryData.NAME);
    }
  }, [guessedCountries]);

  const handleGuess = useCallback(
    (guessedCountry) => {
      setCountryGuessText("");
      setGuessedCountries([
        ...guessedCountries,
        {
          country: selectedCountryData.ISO_A2,
          correct:
            guessedCountry.toUpperCase() ===
            selectedCountryData.NAME.toUpperCase(),
        },
      ]);
      setRecentGuessList([
        {
          attempted: guessedCountry,
          correct: selectedCountryData.NAME,
          guessNumber: guessNumber,
        },
        ...recentGuessList,
      ]);
      setSelectedCountryData(getRandomUnguessedCountry());
      setGuessNumber(guessNumber + 1);
    },
    [
      getRandomUnguessedCountry,
      guessNumber,
      guessedCountries,
      recentGuessList,
      selectedCountryData,
    ]
  );

  const handleKeydown = useCallback(
    (event) => {
      const { key, keyCode } = event;
      if (!selectedCountryData) return;
      // Backspace
      if (keyCode === 8) {
        setCountryGuessText((countryGuessText) =>
          countryGuessText.substr(0, countryGuessText.length - 1)
        );
      }
      // Enter
      if (keyCode === 13) {
        handleGuess(countryGuessText);
        setCountryGuessText("");
      }
      // Noop for name already filled
      if (countryGuessText.length === selectedCountryData.NAME.length) {
        return;
      }
      // Normal alpha keys and space
      if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
        event.preventDefault();
        setCountryGuessText((countryGuessText) => countryGuessText + key);
      }
    },
    [countryGuessText, handleGuess, selectedCountryData]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setSelectedCountryData(getRandomUnguessedCountry());
  }, [getRandomUnguessedCountry]);

  const handleCountryClick = (geoProps) => {
    const alreadyGuessed = guessedCountries.find(
      (s) => s.country === geoProps.ISO_A2
    );

    if (!alreadyGuessed) {
      setCountryGuessText("");
      setSelectedCountryData(geoProps);
    }
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return loading ? (
    "Loading..."
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Guess the Country
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Country Details */}
          <Paper className={classes.guessHeight}>
            <Guess data={selectedCountryData} currentGuess={countryGuessText} />
            <Scorebar
              guessedCountries={guessedCountries}
              totalNumberOfCountries={
                geoData.objects.ne_110m_admin_0_countries.geometries.length
              }
            />
          </Paper>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8}>
              <Paper className={fixedHeightPaper}>
                {/*<Chart />*/}
                <div>
                  <MapChart
                    geoData={geoData}
                    handleCountryClick={handleCountryClick}
                    selectedCountryIsoA2={selectedCountryData?.ISO_A2}
                    loading={loading}
                    data={guessedCountries}
                  />
                  {/* <ReactTooltip> </ReactTooltip> */}
                </div>
              </Paper>
            </Grid>

            {/* Score */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper}>
                <RecentGuesses recentGuessList={recentGuessList} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
