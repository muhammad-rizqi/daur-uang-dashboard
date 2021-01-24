/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { changeToken } from "../redux/action";
import Login from "../screen/auth/login-screen";
import Register from "../screen/auth/register-screen";
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
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();

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
    }
  }, []);

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
