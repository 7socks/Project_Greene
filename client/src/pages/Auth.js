import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer } from "../styles/index.js";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

function Auth({ state, dispatch, init }) {
  const { dev, user } = state;
  // user = {
  //   user_name: 'Dora',
  //   first_name: 'thank you for',
  //   last_name: 'helping him that what im here for',
  //   password: 'test',
  //   lat: user.lat,
  //   lng: user.lng,
  // }

  // const [loggedIn, setLoggedIn] = useState(!!user.user_name);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegistered, setIsRegistered] = useState(true);

  // useEffect(() => {
  //   setLoggedIn(!!user.user_name)
  // }, [user.user_name])

  const handleClickOther = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <PageContainer>
      {isRegistered ? (
        <Login state={state} handleClickOther={handleClickOther} />
      ) : (
        <SignUp state={state} handleClickOther={handleClickOther} />
      )}
    </PageContainer>
  );
}

export default Auth;
