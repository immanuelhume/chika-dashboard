import IconButton from '@material-ui/core/IconButton';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import React, { useCallback } from 'react';
import { useStore } from '../../controllers/store';

interface IColorModeToggleButton {}

export const ColorModeToggleButton: React.FC<IColorModeToggleButton> = () => {
  const { prefersDark, toggleTheme } = useStore(
    useCallback(
      // eslint-disable-next-line no-shadow
      ({ toggleTheme, prefersDark }) => ({ prefersDark, toggleTheme }),
      [],
    ),
  );
  return (
    <IconButton onClick={toggleTheme}>
      {prefersDark ? <NightsStayRoundedIcon /> : <WbSunnyRoundedIcon />}
    </IconButton>
  );
};
