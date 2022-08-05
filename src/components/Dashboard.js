import React, { useEffect, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import clsx from 'clsx';
import PublicIcon from '@material-ui/icons/Public';
import CachedIcon from '@material-ui/icons/Cached';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Grid,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MapChart from './MapChart';
import Guess from './Guess';
import RecentGuesses from './RecentGuesses';
import geoData from './data/geoData.json';
import Scorebar from './Scorebar';
import ReactTooltip from 'react-tooltip';
import ResetConfirmModal from './ResetConfirmModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'grey',
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '30vh',
  },
  guessHeight: {
    height: 'auto',
    marginBottom: 30,
    padding: 10,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCountryData, setSelectedCountryData] = useLocalStorage(
    'selectedCountryData',
    {}
  );
  const [guessedCountries, setGuessedCountries] = useLocalStorage(
    'guessedCountries',
    []
  );
  const [guessNumber, setGuessNumber] = useLocalStorage('guessNumber', 1);
  const [countryGuessText, setCountryGuessText] = useLocalStorage(
    'countryGuessText',
    ''
  );
  const [recentGuessList, setRecentGuessList] = useLocalStorage(
    'recentGuessList',
    []
  );

  const openResetDialog = () => {
    setResetDialogOpen(true);
    document.querySelector('#guessText').focus();
  };

  const handleResetDialogCancel = () => {
    setResetDialogOpen(false);
  };

  const handleResetGame = () => {
    resetGame();
    setResetDialogOpen(false);
  };

  const resetGame = () => {
    setGuessedCountries([]);
    setGuessNumber(1);
    setCountryGuessText('');
    setRecentGuessList([]);
    setSelectedCountryData(getRandomUnguessedCountry());
  };

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
        console.log('Not Guessed: ', randomCountryData.NAME);
        return randomCountryData;
      }
      console.log('Already Guessed: ', randomCountryData.NAME);
    }
  }, [guessedCountries]);

  const handleGuess = useCallback(
    (guessedCountry) => {
      setCountryGuessText('');
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
      setCountryGuessText,
      setGuessNumber,
      setGuessedCountries,
      setRecentGuessList,
      setSelectedCountryData,
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
        setCountryGuessText('');
      }
      // Noop for name already filled
      if (countryGuessText.length === selectedCountryData.NAME.length) {
        return;
      }
      // Handle Spaces
      if (keyCode === 32) {
        event.preventDefault();

        if (selectedCountryData.NAME[countryGuessText.length] === ' ') {
          setCountryGuessText(
            (countryGuessText) => countryGuessText + key.toUpperCase()
          );
        }
      }
      // Normal alpha keys and space
      if (
        (keyCode >= 65 && keyCode <= 90) ||
        keyCode === 189 ||
        keyCode === 222 ||
        keyCode === 190
      ) {
        event.preventDefault();

        if (selectedCountryData.NAME[countryGuessText.length] === ' ') {
          setCountryGuessText(
            (countryGuessText) => countryGuessText + ' ' + key.toUpperCase()
          );
        } else {
          setCountryGuessText(
            (countryGuessText) => countryGuessText + key.toUpperCase()
          );
        }
      }
    },
    [countryGuessText, handleGuess, selectedCountryData, setCountryGuessText]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
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
      setCountryGuessText('');
      setSelectedCountryData(geoProps);
    }

    document.querySelector('#guessText').focus();
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return loading ? (
    'Loading...'
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <PublicIcon style={{ marginRight: '1em' }} />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Geography Time!
          </Typography>
          <IconButton onClick={openResetDialog}>
            <EmojiObjectsIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton onClick={openResetDialog}>
            <CachedIcon style={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ResetConfirmModal
        open={resetDialogOpen}
        handleCancel={handleResetDialogCancel}
        handleReset={handleResetGame}
      />

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
              <Paper className={fixedHeightPaper} style={{ padding: '0' }}>
                {/*<Chart />*/}
                <MapChart
                  geoData={geoData}
                  handleCountryClick={handleCountryClick}
                  selectedCountryIsoA2={selectedCountryData?.ISO_A2}
                  loading={loading}
                  data={guessedCountries}
                  setTooltipContent={setTooltipContent}
                />
              </Paper>
              <ReactTooltip>{tooltipContent}</ReactTooltip>
            </Grid>

            {/* Guesses */}
            <Grid item xs={12} md={4}>
              <Paper className={fixedHeightPaper} style={{ maxHeight: '100%' }}>
                <RecentGuesses recentGuessList={recentGuessList} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
