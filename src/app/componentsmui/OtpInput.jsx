import { MuiOtpInput } from 'mui-one-time-password-input';
const OtpInput = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    onChange(() => newValue);
  };

  const css = {
    '@media (max-width: 440px)': {
      maxWidth: '360px',
    },
  };
  return (
    <>
      <MuiOtpInput
        value={value}
        onChange={handleChange}
        length={6}
        autoFocus
        TextFieldsProps={{ size: 'small' }}
      />
    </>
  );
};
export default OtpInput;
