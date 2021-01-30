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
                my={3}
                p={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid black",
                  borderRadius: "20px",
                  backgroundColor:
                    guess.attempted.toUpperCase() ===
                    guess.correct.toUpperCase()
                      ? "#7fbd5b"
                      : "#e6255b",
                }}
              >
                {guess.attempted.toUpperCase() ===
                guess.correct.toUpperCase() ? (
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
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
