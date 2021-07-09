import React from 'react';
import Typography from '@material-ui/core/Typography';

interface IPageIntroText {}

export const PageIntroText: React.FC<IPageIntroText> = ({ children }) => {
  return (
    <Typography variant="body1" color="textSecondary" gutterBottom>
      {children}
    </Typography>
  );
};
