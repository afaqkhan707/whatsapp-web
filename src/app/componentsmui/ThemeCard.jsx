import {
  Card,
  CardActions,
  CardContent,
  Button,
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
  const [selectedMode, setSelectedMode] = useState('system');
  const { theme, toggleDarkMode, selectedTheme } = useContext(ThemeContext);
  const [value, setValue] = useState(selectedTheme);

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setValue(e.target.value);
    console.log(e.target.value);
    setSelectedMode(e.target.value);
    toggleDarkMode(selectedTheme);
  };
  // const handleThemeChange = (e) => {
  //   const selectedTheme = e.target.value;
  //   console.log(e.target.value);
  //   setSelectedMode(e.target.value);
  //   toggleDarkMode(selectedTheme);
  // };

  return (
    <FormControl>
      <FormLabel id='demo-controlled-radio-buttons-group'>
        Chose Theme
      </FormLabel>
      <RadioGroup
        aria-labelledby='demo-controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
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
