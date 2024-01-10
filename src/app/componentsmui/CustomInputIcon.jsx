import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInputWithIcon() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <FormControl
      variant='outlined'
      sx={{ width: '100%', marginBottom: '10px' }}
    >
      <InputLabel htmlFor='outlined-adornment-password' size='small'>
        {'Password'}
      </InputLabel>
      <OutlinedInput
        size='small'
        id='outlined-adornment-password'
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        required
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? (
                <VisibilityOff size='small' />
              ) : (
                <Visibility size='small' />
              )}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      />
    </FormControl>
  );
}
