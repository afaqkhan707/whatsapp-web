import Signup from '@/app/componentsmui/Signup';
import Head from 'next/head';
import React from 'react';

const signup = () => {
  return (
    <>
      <Head>
        <title>SignUp</title>
        <link rel='icon' href='./logged.ico' />
      </Head>
      <Signup />
      
    </>
  );
};

export default signup;
