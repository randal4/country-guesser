import React from 'react';
import { Typography, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  guessWrapper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  guessTextBox: {
    border: '0px',
    fontSize: '3vw',
    minWidth: '100%',
    letterSpacing: '.4em',
    color: theme.palette.primary.main,
    spellCheck: false,
    caretColor: 'transparent',
    textAlign: 'center',
  },
}));

export default function Guess({ data, currentGuess }) {
  const classes = useStyles();

  console.log('data.NAME', data.NAME);
  console.log('data.NAME.length', data.NAME.length);
  console.log('currentGuess.length', currentGuess.length);

  const handleOnClick = () => {};

  const generateUnguessedPlaceholders = (currentGuess, answer) => {
    let i = 0;
    let placeHolder = [];

    while (i < answer.length) {
      if (currentGuess[i]) {
        placeHolder.push(currentGuess[i]);
      } else {
        answer[i] === ' ' ? placeHolder.push(' ') : placeHolder.push('_');
      }
      i++;
    }

    return placeHolder.join('');
  };

  return data ? (
    <div className={classes.guessWrapper} onClick={handleOnClick}>
      <FormControl style={{ width: '100%' }}>
        <input
          type="text-area"
          spellCheck="false"
          id="guessText"
          className={classes.guessTextBox}
          // onChange={generateUnguessedPlaceholders(currentGuess, data.NAME)}
          value={
            generateUnguessedPlaceholders(currentGuess, data.NAME)
            // currentGuess + '_'.repeat(data.NAME.length - currentGuess.length)
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
