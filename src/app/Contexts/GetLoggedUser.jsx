'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import {
  onAuthStateChanged,
  auth,
  db,
  doc,
  onSnapshot,
  signOut,
} from '../firebase/friebaseConfig';
import { useRouter } from 'next/router';

export const getLoggedUser = createContext();

export const useLoggedUserContext = () => {
  return useContext(getLoggedUser);
};
const LoggedUser = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push('signin');
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (loginUser) => {
      if (loginUser) {
        const userDocRef = doc(db, 'users', loginUser.uid);
        const unsubscribe = onSnapshot(
          userDocRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot?.data();
              // console.log('Document Data:', data);
              setUser(data);
            } else {
              //   console.log('Document does not exist');
              setUser(null);
            }
          },
          (error) => {
            console.error('Error fetching document:', error);
          }
        );

        return () => {
          unsubscribe();
        };
      } else {
        // console.log('Logged Out');
        setUser(null);
      }
    });
  }, []);

  return (
    <getLoggedUser.Provider value={{ user, setUser, logout }}>
      {children}
    </getLoggedUser.Provider>
  );
};

export default LoggedUser;
