import React from "react";
import { useSelector } from "react-redux";

const TabunganScreen = ({ history }) => {
  const { nasabah } = useSelector((state) => state);
  const { data } = nasabah.user;

  const onClickNasabah = (user) => {
    history.push({
      pathname: "/tabungan/" + user.id,
      state: { user: user },
    });
  };

  return (
    <div className="card table-responsive-md easion-card">
      <div className="card-header">
        <div className="easion-card-icon">
          <i className="fas fa-table"></i>
        </div>
        <div className="easion-card-title">Data Nasabah</div>
      </div>
      <div className="card-body">
        <table className="table table-hover table-in-card">
          <thead>
            <tr>
              <th scope="col">No. </th>
              <th scope="col">ID Nasabah</th>
              <th scope="col">Avatar</th>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Email</th>
              <th scope="col">Telepon</th>
              <th scope="col">Lokasi</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((v) => v.role === 1)
              .map((user, index) => {
                let lokasi = "";
                try {
                  lokasi = JSON.parse(user.lokasi).name;
                } catch {
                  lokasi = user.lokasi;
                }

                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickNasabah(user)}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>
                      <small>{user.id}</small>
                    </td>
                    <td>
                      <img
                        src={user.avatar}
                        className="rounded-circle"
                        alt="Avatar"
                        style={{ width: 50, height: 50 }}
                      />
                    </td>
                    <td>{user.nama_lengkap}</td>
                    <td>{user.email}</td>
                    <td>{user.telepon}</td>
                    <td>{lokasi}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabunganScreen;
