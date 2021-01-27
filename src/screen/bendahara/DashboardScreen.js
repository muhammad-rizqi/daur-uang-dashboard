import React from "react";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
  const { penjual } = useSelector((state) => state);
  const { user } = useSelector((state) => state.nasabah);

  const userSum = !user.loading && user.data.length;
  return (
    <div className="row dash-row">
      <div className="col-xl-4">
        <div className="stats stats-primary">
          <h3 className="stats-title"> User </h3>
          <div className="stats-content">
            <div className="stats-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="stats-data">
              <div className="stats-number">
                {user.loading ? (
                  <span className="spinner-grow spinner-grow-sm"></span>
                ) : (
                  userSum
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="stats stats-success ">
          <h3 className="stats-title"> Keuangan </h3>
          <div className="stats-content">
            <div className="stats-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stats-data">
              <div className="stats-number">
                {penjual.saldo.loading ? (
                  <span className="spinner-grow spinner-grow-sm"></span>
                ) : (
                  "Rp. " + penjual.saldo.data
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="stats stats-danger">
          <h3 className="stats-title"> Kategori sampah </h3>
          <div className="stats-content">
            <div className="stats-icon">
              <i className="fas fa-boxes"></i>
            </div>
            <div className="stats-data">
              <div className="stats-number">
                {penjual.stok.loading ? (
                  <span className="spinner-grow spinner-grow-sm"></span>
                ) : (
                  penjual.stok.data.length
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
