import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  penarikanNasabah,
  penyetoranNasabah,
} from "../../services/endpoint/nasabah";
import { addTarik, getSaldo } from "../../services/endpoint/tabungan";
import { getUserData } from "../../services/endpoint/user";
import { toDate } from "../../services/helper/helper";

const TabunganNasabah = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { nasabah } = useSelector((state) => state);
  const { role } = useSelector((state) => state.user);
  const { userId } = useParams();
  const { data } = nasabah.penarikan;
  const [saldo, setSaldo] = useState("-");
  const [tarik, setTarik] = useState(0);
  const penyetoran = nasabah.penyetoran.data;
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    console.log(userId); // result: '/secondpage'
    if (location.state) {
      setUser(location.state.user);
    } else {
      getUserData(userId)
        .then((res) => res.code === 200 && setUser(res.data.user))
        .catch((e) => console.log(e));
    }
    getSaldo(userId)
      .then((res) => res.code === 200 && setSaldo(res.data.saldo))
      .catch((e) => console.log(e));
    penarikanNasabah(userId);
    penyetoranNasabah(userId);
  }, [location, userId]);

  const onClickTarik = (e) => {
    if (tarik <= saldo || tarik > 1000) {
      setLoading(true);
      addTarik(userId, tarik)
        .then((res) => {
          if (res.code === 200) {
            alert("berhasil");
            history.push(location.pathname);
          }
        })
        .catch((e) => {
          alert("gagal");
          console.log(e);
        })
        .finally(() => setLoading(false));
    } else {
      alert("Jumlah Salah");
    }
    e.preventDefault();
  };
  return (
    <div>
      {user && (
        <>
          <div className="media p-3">
            <img
              src={user.avatar}
              alt={user.nama_lengkap}
              className="mr-3 rounded-circle"
              style={{ width: "60px", height: "60px" }}
            />
            <div className="media-body">
              <h4>{user.nama_lengkap}</h4>
              <p>
                {user.email} - {user.telepon}
              </p>
              <p>Saldo : Rp {saldo},-</p>
            </div>
          </div>
        </>
      )}
      <div className="p-2">
        <div
          className="easion-card-icon"
          style={{ cursor: "pointer" }}
          onClick={() =>
            role === 4
              ? history.push("/bendahara/tabungan")
              : history.push("/admin/tabungan")
          }
        >
          <i className="fas fa-arrow-left mr-3"></i>
          Kembali
        </div>
      </div>
      {role === 4 && (
        <>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-toggle="modal"
            data-target="#myModal"
          >
            Tarik Tabungan
          </button>
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Tarik Tabungan</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form className="my-3">
                    <label htmlFor="tarik">Jumlah Penarikan</label>
                    <input
                      min="1000"
                      max={saldo}
                      type="number"
                      className="form-control"
                      id="tarik"
                      placeholder="1000"
                      value={tarik}
                      onInput={(e) => {
                        setTarik(e.target.value);
                      }}
                    />
                  </form>
                  <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    onClick={onClickTarik}
                    disabled={loading}
                  >
                    {!loading ? (
                      "Tarik"
                    ) : (
                      <>
                        <span className="spinner-grow spinner-grow-sm"></span>
                        Tarik
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
                        <td>{toDate(tarik.tanggal)}</td>
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
                        <td>{toDate(setor.tanggal)}</td>
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
