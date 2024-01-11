import 'react-international-phone/style.css';

import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { useThemeContext } from '../Contexts/ThemeContext';

const MuiPhone = ({ value, onChange, sx, ...restProps }) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: 'pk',
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  const { theme } = useThemeContext();
  const inputFieldCss = {
    marginBottom: '16px',
    color: theme.palette.text.primary,
    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  };
  return (
    <TextField
      sx={{ margin: '10px 0px',color: theme.palette.text.primary, ...sx }}
      size='small'
      variant='outlined'
      label='Phone number'
      color='primary'
      placeholder='Phone number'
      value={inputValue}
      onChange={handlePhoneValueChange}
      type='tel'
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position='start'
            style={{
              marginRight: '2px',
              marginLeft: '-8px',
              color: theme.palette.text.primary,
            }}
          >
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                // Remove default outline (display only on focus)
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                // Update default spacing
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: 'flex' }} />
              )}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: '8px' }}
                    />
                    <Typography marginRight='8px'>{country.name}</Typography>
                    <Typography color='gray'>+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
export default MuiPhone;