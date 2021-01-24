import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";

export default function RecentGuesses({ recentGuessList }) {
  return (
    <div>
      {recentGuessList.map((guess) => {
        return (
          <Box my={3} style={{ display: "flex", alignItems: "center" }}>
            {guess.attempted.toUpperCase() === guess.correct.toUpperCase() ? (
              <CheckCircleIcon />
            ) : (
              <ClearIcon />
            )}
            <Box mx={3}>
              <Typography>Attempted: {guess.attempted}</Typography>
              <Typography>Correct: {guess.correct}</Typography>
            </Box>
            <Divider />
          </Box>
        );
      })}
    </div>
  );
}
