import React from "react";
import { Typography } from "@material-ui/core";
import Title from "./Title";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    //margin: "15px 5px 15px 5px",
  },
});

export default function DetailsStat(props) {
  const { title, content } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>{title}</Title>
      <Typography align="center" component="p" variant="h4" gutterBottom>
        {content}
      </Typography>
    </div>
  );
}
