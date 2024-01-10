import '../src/app/globals.css';
import ThemeContextProvider from '@/app/Contexts/ThemeContext';
import LoggedUser from '@/app/Contexts/GetLoggedUser';
import withAuth from '@/app/componentsmui/withAuth';
import { ToastContainer } from 'react-toastify';
function App({ Component, pageProps }) {
  return (
    <>
      <ThemeContextProvider>
        <LoggedUser>
          <Component {...pageProps} />
          <ToastContainer />
        </LoggedUser>
      </ThemeContextProvider>
    </>
  );
}

export default App;
