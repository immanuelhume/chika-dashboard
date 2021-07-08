import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

interface IAuthModal extends React.ComponentProps<typeof Dialog> {}

export const AuthModal: React.FC<IAuthModal> = ({ ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>Your session has expired!</DialogTitle>
      <DialogContent>
        <DialogContentText>Please login again.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="default" href={process.env.NEXT_PUBLIC_LOGIN_URL}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
