import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

function Notifications({ notifications, onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClose();
  };

  return (
    <>
      {notifications.length > 0 && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {notifications[0].message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Notifications;
