/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { changeToken, setUser } from "../redux/action";
import Login from "../screen/auth/login-screen";
import Register from "../screen/auth/register-screen";
import { profile } from "../services/endpoint/authServices";
import { getNasabah } from "../services/endpoint/nasabah";
import {
  getDataPenjualan,
  getSaldoPenjualan,
  getStok,
} from "../services/endpoint/penjual";
import { getDataSetoran } from "../services/endpoint/penyetor";

import { getToken } from "../services/storage/Token";
import BendaharaRouter from "./BendaharaRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [splash, setSplash] = useState(true);
  const { token, user } = useSelector((state) => state);

  const getProfile = () => {
    profile()
      .then((res) => {
        if (res.code === 200) {
          dispatch(setUser(res.data.user));
        }
        setSplash(false);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        setSplash(false);
      });
  };

  useEffect(() => {
    const dataToken = getToken();
    console.log(dataToken);
    if (dataToken !== undefined || dataToken === "") {
      dispatch(changeToken(dataToken));
      getSaldoPenjualan();
      getDataPenjualan();
      getDataSetoran();
      getStok();
      getNasabah();
      getProfile();
    } else {
      setSplash(false);
    }
  }, []);

  if (splash) {
    return <h1>Loading...</h1>;
  }

  if (token === null || token === "") {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route exact path="/register/" component={Register} />
          <Route exact path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    );
  }

  return <BendaharaRouter />;
};
