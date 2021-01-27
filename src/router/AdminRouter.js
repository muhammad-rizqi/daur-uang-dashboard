/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { clearToken } from "../redux/action";
import UserAdmin from "../screen/admin/UserAdmin";

import {
  DashboardScreen,
  GudangScreen,
  PenjualanScreen,
  SetoranScreen,
  TabunganNasabah,
  TabunganScreen,
} from "../screen/bendahara";
import Profile from "../screen/Profile";

const AdminRouter = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const logout = () => {
    dispatch(clearToken());
  };

  let path = "/admin";

  return (
    <Router>
      <div className="dash">
        <div className="dash-nav dash-nav-dark">
          <header>
            <a href="#" className="menu-toggle">
              <i className="fas fa-bars"></i>
            </a>
            <Link to={path} className="easion-logo">
              <i className="fas fa-sun"></i> <span>Daur Uang</span>
            </Link>
          </header>
          <nav className="dash-nav-list">
            <Link to={path} className="dash-nav-item">
              <i className="fas fa-home"></i> Dashboard{" "}
            </Link>
            <Link to={path + "/setoran"} className="dash-nav-item">
              <i className="fas fa-truck-loading"></i> Penyetoran Sampah{" "}
            </Link>
            <Link to={path + "/gudang"} className="dash-nav-item">
              <i className="fas fa-warehouse"></i> Data Sampah{" "}
            </Link>
            <Link to={path + "/tabungan"} className="dash-nav-item">
              <i className="fas fa-money-check-alt"></i> Tabungan Nasabah{" "}
            </Link>
            <Link to={path + "/penjualan"} className="dash-nav-item">
              <i className="fas fa-luggage-cart"></i> Penjualan{" "}
            </Link>
            <Link to={path + "/users"} className="dash-nav-item">
              <i className="fas fa-user"></i> User{" "}
            </Link>
          </nav>
        </div>
        <div className="dash-app">
          <header className="dash-toolbar">
            <a href="#" className="menu-toggle">
              <i className="fas fa-bars"></i>
            </a>
            <h4>Selamat datang {user.nama_lengkap}</h4>
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
                  <Link to={path + "/profile"} className="dropdown-item">
                    Profile
                  </Link>
                  <span
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className="dash-content">
            <div className="container-fluid">
              <Switch>
                <Route exact path={path} component={DashboardScreen} />
                <Route
                  exact
                  path={path + "/setoran"}
                  component={SetoranScreen}
                />
                <Route exact path={path + "/gudang"} component={GudangScreen} />
                <Route
                  exact
                  path={path + "/tabungan"}
                  component={TabunganScreen}
                />
                <Route
                  exact
                  path={path + "/tabungan/:userId"}
                  component={TabunganNasabah}
                />
                <Route
                  exact
                  path={path + "/penjualan"}
                  component={PenjualanScreen}
                />
                <Route exact path={path + "/profile"} component={Profile} />
                <Route exact path={path + "/users"} component={UserAdmin} />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default AdminRouter;
