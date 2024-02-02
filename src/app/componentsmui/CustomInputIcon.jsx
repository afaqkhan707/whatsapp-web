import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInputWithIcon({
  onChange,
  label,
  name,
  value,
  htmlfor,
  type,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ marginBottom: '10px' }}>
      <InputLabel htmlFor={htmlfor} size='small'>
        {label}
      </InputLabel>

      <OutlinedInput
        name={name}
        value={value}
        size='small'
        id={htmlfor}
        type={showPassword ? 'text' : type}
        onChange={(e) => onChange(e)}
        required
        endAdornment={
          <IconButton onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility size='small' />}
          </IconButton>
        }
        label={label}
      />
    </FormControl>
  );
}
