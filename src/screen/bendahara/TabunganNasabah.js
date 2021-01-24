import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  penarikanNasabah,
  penyetoranNasabah,
} from "../../services/endpoint/nasabah";
import { getUserData } from "../../services/endpoint/user";

const TabunganNasabah = ({ history }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { nasabah } = useSelector((state) => state);
  const { userId } = useParams();
  const { data } = nasabah.penarikan;

  const penyetoran = nasabah.penyetoran.data;

  useEffect(() => {
    console.log(userId); // result: '/secondpage'
    if (location.state) {
      setUser(location.state.user);
    } else {
      getUserData(userId)
        .then((res) => res.code === 200 && setUser(res.data.user))
        .catch((e) => console.log(e));
    }
    penarikanNasabah(userId);
    penyetoranNasabah(userId);
  }, [location, userId]);

  console.log(user);
  return (
    <div>
      <div class="media p-3">
        {user && (
          <>
            <img
              src={user.avatar}
              alt={user.nama_lengkap}
              class="mr-3 rounded-circle"
              style={{ width: "60px", height: "60px" }}
            />
            <div class="media-body">
              <h4>{user.nama_lengkap}</h4>
              <p>
                {user.email} - {user.telepon}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="p-2">
        <div
          className="easion-card-icon"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/tabungan")}
        >
          <i className="fas fa-arrow-left mr-3"></i>
          Kembali
        </div>
      </div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#penarikan">
            Penarikan
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#penyetoran">
            Penyetoran
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane active" id="penarikan">
          <div className="card table-responsive-md easion-card">
            <div className="card-header">
              <div className="easion-card-icon">
                <i className="fas fa-table"></i>
              </div>
              <div className="easion-card-title">Data Penarikan Nasabah</div>
            </div>
            <div className="card-body">
              <table className="table table-hover table-in-card">
                <thead>
                  <tr>
                    <th scope="col">No. </th>
                    <th scope="col">ID Penarikan</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Kredit</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((tarik, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <small>{tarik.id}</small>
                        </td>
                        <td>{tarik.tanggal}</td>
                        <td>{tarik.kredit}</td>
                        <td>{tarik.saldo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="penyetoran">
          <div className="card table-responsive-md easion-card">
            <div className="card-header">
              <div className="easion-card-icon">
                <i className="fas fa-table"></i>
              </div>
              <div className="easion-card-title">Data Penyetoran Nasabah</div>
            </div>
            <div className="card-body">
              <table className="table table-hover table-in-card">
                <thead>
                  <tr>
                    <th scope="col">No. </th>
                    <th scope="col">ID Penarikan</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Jenis Sampah</th>
                    <th scope="col">Berat</th>
                    <th scope="col">Debit</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {penyetoran.map((setor, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <small>{setor.id}</small>
                        </td>
                        <td>{setor.tanggal}</td>
                        <td>{setor.relation.jenis_sampah.nama_kategori}</td>
                        <td>{setor.berat}</td>
                        <td>{setor.debit}</td>
                        <td>{setor.saldo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabunganNasabah;
