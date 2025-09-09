import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  content = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  cancelColor = 'inherit',
  maxWidth = 'sm',
  fullWidth = true,
  loading = false,
  disableConfirmButton = false,
  disableCancelButton = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : null}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color={cancelColor}
          disabled={loading || disableCancelButton}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={loading || disableConfirmButton}
          autoFocus
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
