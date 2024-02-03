import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useState } from 'react';

const ThemeCard = () => {
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);
  const [value, setValue] = useState(selectedTheme);

  const handleChange = (e) => {
    setValue(e.target.value);
    setSelectedTheme(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel id='themeSelectionCard'>Chose Theme</FormLabel>
      <RadioGroup id='themeSelectionCard' value={value} onChange={handleChange}>
        <FormControlLabel
          value='system'
          control={<Radio />}
          label='System Default'
        />
        <FormControlLabel value='light' control={<Radio />} label='Light' />
        <FormControlLabel value='dark' control={<Radio />} label='Dark' />
      </RadioGroup>
    </FormControl>
  );
};

export default ThemeCard;
