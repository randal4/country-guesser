import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MapChart from "./MapChart";
import Guess from "./Guess";
import RecentGuesses from "./RecentGuesses";

const useStyles = makeStyles((theme) => ({
  root: {
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
    height: 100,
    marginBottom: 30,
    padding: 10,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [selectedCountryData, setSelectedCountryData] = React.useState();
  const [guessedCountries, setGuessedCountries] = React.useState([
    { country: "US", correct: true },
    { country: "CA", correct: false },
  ]);
  const [countryGuessText, setCountryGuessText] = useState("");
  const [recentGuessList, setRecentGuessList] = useState([]);

  const handleSubmit = () => {
    //e.preventDefault();
    handleGuess(countryGuessText);
    setCountryGuessText("");
  };

  const handleKeydown = (event) => {
    const { key, keyCode } = event;
    if (!selectedCountryData) return;
    if (keyCode === 8) {
      setCountryGuessText((countryGuessText) =>
        countryGuessText.substr(0, countryGuessText.length - 1)
      );
    }
    if (keyCode === 13) {
      handleSubmit();
    }
    if (countryGuessText.length === selectedCountryData.NAME.length) {
      return;
    }
    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
      event.preventDefault();
      setCountryGuessText((countryGuessText) => countryGuessText + key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCountryClick = (geoProps) => {
    const alreadyGuessed = guessedCountries.find(
      (s) => s.country === geoProps.ISO_A2
    );

    if (!alreadyGuessed) {
      setCountryGuessText("");
      setSelectedCountryData(geoProps);
    }
  };

  const handleGuess = (guessedCountry) => {
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
      { attempted: guessedCountry, correct: selectedCountryData.NAME },
      ...recentGuessList,
    ]);
    setSelectedCountryData(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return loading ? (
    "Loading..."
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      {/*<AppBar position="absolute" className={classes.appBar}>
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
  </AppBar>*/}

      <main className={classes.content}>
        {/*<div className={classes.appBarSpacer} />*/}
        <Container maxWidth="lg" className={classes.container}>
          {/* Country Details */}
          <Grid item xs={12} spacing={3}>
            <Paper className={classes.guessHeight}>
              <Guess
                data={selectedCountryData}
                currentGuess={countryGuessText}
              />
            </Paper>
          </Grid>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8}>
              <Paper className={fixedHeightPaper}>
                {/*<Chart />*/}
                <div>
                  <MapChart
                    handleCountryClick={handleCountryClick}
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
