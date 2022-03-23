import React from 'react';
import PropTypes from 'prop-types';

import {
  Alert,
  Snackbar,
} from '@mui/material';

export default function Toast({
  open,
  onDismissClick,
  severity,
  message,
}) {
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} variant="filled" autoHideDuration={5000} open={open} onClose={() => onDismissClick()}>
      <Alert elevation={4} severity={severity} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
  );
}

Toast.propTypes = {
  severity: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
