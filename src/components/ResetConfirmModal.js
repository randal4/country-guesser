import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
} from "@material-ui/core";

export default function ResetConfirmModal({ open, handleReset, handleCancel }) {
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle id="customized-dialog-title" onClose={handleCancel}>
        Start Over?
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Are you sure you want lose all progress and restart the game?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleReset} color="primary">
          RESET
        </Button>
        <Button autoFocus onClick={handleCancel} color="primary">
          CANCEL
        </Button>
      </DialogActions>{" "}
    </Dialog>
  );
}
