import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./RecentGuesses.css";

export default function RecentGuesses({ recentGuessList }) {
  return (
    <div>
      <TransitionGroup className="todo-list">
        {recentGuessList.map((guess) => {
          return (
            <CSSTransition
              in={true}
              timeout={300}
              classNames="item"
              unmountOnExit
              key={guess.guessNumber}
            >
              <Box
                mb={3}
                p={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid black",
                  borderRadius: "10px",
                  backgroundColor:
                    guess.attempted.toUpperCase() ===
                    guess.correct.toUpperCase()
                      ? "#A9CF54"
                      : "#F1433F",
                }}
              >
                {guess.attempted.toUpperCase() ===
                guess.correct.toUpperCase() ? (
                  <CheckCircleIcon />
                ) : (
                  <ClearIcon />
                )}
                <Box mx={3}>
                  <Box>
                    <Typography display="inline">Attempted: </Typography>
                    <Typography variant="h6" display="inline">
                      {guess.attempted}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography display="inline">Correct: </Typography>
                    <Typography variant="h6" display="inline">
                      {guess.correct}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </Box>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
