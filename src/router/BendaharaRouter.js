import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { clearToken } from "../redux/action";

import {
  DashboardScreen,
  GudangScreen,
  PenjualanScreen,
  SetoranScreen,
  TabunganNasabah,
  TabunganScreen,
} from "../screen/bendahara";

const BendaharaRouter = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearToken());
  };

  return (
    <Router>
      <div className="dash">
        <div className="dash-nav dash-nav-dark">
          <header>
            <a href="#!" className="menu-toggle">
              <i className="fas fa-bars"></i>
            </a>
            <a href="index.html" className="easion-logo">
              <i className="fas fa-sun"></i> <span>Daur Uang</span>
            </a>
          </header>
          <nav className="dash-nav-list">
            <Link to="/" className="dash-nav-item">
              <i className="fas fa-home"></i> Dashboard{" "}
            </Link>
            <Link to="/setoran/" className="dash-nav-item">
              <i className="fas fa-truck-loading"></i> Penyetoran Sampah{" "}
            </Link>
            <Link to="/gudang/" className="dash-nav-item">
              <i className="fas fa-warehouse"></i> Data Sampah{" "}
            </Link>
            <Link to="/tabungan/" className="dash-nav-item">
              <i className="fas fa-money-check-alt"></i> Tabungan Nasabah{" "}
            </Link>
            <Link to="/penjualan/" className="dash-nav-item">
              <i className="fas fa-luggage-cart"></i> Penjualan{" "}
            </Link>
          </nav>
        </div>
        <div className="dash-app">
          <header className="dash-toolbar">
            <a href="#" className="menu-toggle">
              <i className="fas fa-bars"></i>
            </a>
            <h4>Selamat datang bendahara</h4>
            <div className="tools">
              <div className="dropdown tools-item">
                <a
                  href="#"
                  className=""
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user"></i>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenu1"
                >
                  <a className="dropdown-item" href="#!">
                    Profile
                  </a>
                  <span className="dropdown-item" onClick={logout}>
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className="dash-content">
            <div className="container-fluid">
              <Switch>
                <Route exact path="/" component={DashboardScreen} />
                <Route exact path="/setoran/" component={SetoranScreen} />
                <Route exact path="/gudang/" component={GudangScreen} />
                <Route exact path="/tabungan/" component={TabunganScreen} />
                <Route
                  exact
                  path="/tabungan/:userId"
                  component={TabunganNasabah}
                />
                <Route exact path="/penjualan/" component={PenjualanScreen} />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default BendaharaRouter;
