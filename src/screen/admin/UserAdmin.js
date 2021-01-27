import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getNasabah } from "../../services/endpoint/nasabah";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../services/endpoint/user";

const UserAdmin = () => {
  const { nasabah } = useSelector((state) => state);
  const { data } = nasabah.user;
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(1);
  const [password, setPassword] = useState("");

  const onSelected = (index) => {
    setSelected({
      id: data[index].id,
      name: data[index].nama_lengkap,
      email: data[index].email,
      phone: data[index].telepon,
      role: data[index].role,
    });
  };

  const onClickUpdate = async (e) => {
    const { id, name, email, phone, role } = selected;
    if ((id, name, email, phone, role)) {
      setLoading(true);
      try {
        const resUpdate = await updateUser(id, name, email, phone, role);
        if (resUpdate.code === 200) {
          setLoading(false);
          alert("Berhasil diupdate");
          getNasabah();
        } else {
          alert("Gagal diupdate");
        }
      } catch (error) {
        console.log(error);
        alert("Kesalahan koneksi");
        setLoading(false);
      }
    } else {
      alert("Harap isi dengan benar");
    }
    e.preventDefault();
  };

  const onClickAdd = async (e) => {
    if ((name, email, phone, role, password)) {
      setLoading(true);
      try {
        const resUpdate = await createUser(name, email, phone, role, password);
        if (resUpdate.code === 201) {
          alert("Berhasil membuat user baru");
          setLoading(false);
          getNasabah();
        } else {
          alert("Gagal membuat user baru");
        }
      } catch (error) {
        console.log(error);
        alert("Kesalahan koneksi");
        setLoading(false);
      }
    } else {
      alert("Harap isi dengan benar");
    }
    e.preventDefault();
  };

  const onClickDelete = async (userId) => {
    setLoading(true);
    try {
      const resUpdate = await deleteUser(userId);
      if (resUpdate.code === 200) {
        alert("Berhasil menghapus");
        setLoading(false);
        getNasabah();
      } else {
        alert("Gagal menghapus");
      }
    } catch (error) {
      console.log(error);
      alert("Kesalahan koneksi");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card table-responsive-md easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-table"></i>
          </div>
          <div className="easion-card-title">Create User</div>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="nama-lengkap">Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                id="nama-lengkap"
                placeholder="Masukkan Nama Lengkap"
                value={name}
                onInput={(e) => {
                  setName(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="alamatEmail">Alamat email</label>
              <input
                type="email"
                className="form-control"
                id="alamatEmail"
                placeholder="nama@example.com"
                value={email}
                onInput={(e) => {
                  setEmail(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telepon">Nomor Telepon</label>
              <input
                type="phone"
                className="form-control"
                id="telepon"
                placeholder="08123456789"
                value={phone}
                onInput={(e) => {
                  setPhone(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  e.preventDefault();
                }}
              >
                <option value="1">Nasabah</option>
                <option value="2">Pengurus Penyetoran</option>
                <option value="3">Pengurus Penjualan</option>
                <option value="4">Bendahara</option>
                <option value="999">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="08123456789"
                value={password}
                onInput={(e) => {
                  setPassword(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={onClickAdd}
            >
              {!loading ? (
                "Create"
              ) : (
                <>
                  <span className="spinner-grow spinner-grow-sm"></span>
                  Creating
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {selected && (
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit User</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="nama-lengkap">Nama Lengkap</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nama-lengkap"
                      placeholder="Masukkan Nama Lengkap"
                      value={selected.name}
                      onInput={(e) => {
                        setSelected({ ...selected, name: e.target.value });
                        e.preventDefault();
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="alamatEmail">Alamat email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="alamatEmail"
                      placeholder="nama@example.com"
                      value={selected.email}
                      onInput={(e) => {
                        setSelected({ ...selected, email: e.target.value });
                        e.preventDefault();
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telepon">Nomor Telepon</label>
                    <input
                      type="phone"
                      className="form-control"
                      id="telepon"
                      placeholder="08123456789"
                      value={selected.phone}
                      onInput={(e) => {
                        setSelected({ ...selected, phone: e.target.value });
                        e.preventDefault();
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Role</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={selected.role}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelected({ ...selected, role: e.target.value });
                        e.preventDefault();
                      }}
                    >
                      <option value="1">Nasabah</option>
                      <option value="2">Pengurus Penyetoran</option>
                      <option value="3">Pengurus Penjualan</option>
                      <option value="4">Bendahara</option>
                      <option value="999">Admin</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={onClickUpdate}
                  >
                    {!loading ? (
                      "Update"
                    ) : (
                      <>
                        <span className="spinner-grow spinner-grow-sm"></span>
                        Updating
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card table-responsive-md easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-table"></i>
          </div>
          <div className="easion-card-title">Data User</div>
        </div>
        <div className="card-body">
          <table className="table table-hover table-in-card">
            <thead>
              <tr>
                <th scope="col">No. </th>
                <th scope="col">Avatar</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Telepon</th>
                <th scope="col">Lokasi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => {
                let lokasi = "";
                try {
                  lokasi = JSON.parse(user.lokasi).name;
                } catch {
                  lokasi = user.lokasi;
                }

                return (
                  <tr>
                    <th scope="row">{index + 1}</th>

                    <td>
                      <img
                        src={user.avatar}
                        className="rounded-circle"
                        alt="Avatar"
                        style={{ width: 50, height: 50 }}
                      />
                    </td>
                    <td>{user.nama_lengkap}</td>
                    <td>
                      {user.role === 1
                        ? "Nasabah"
                        : user.role === 2
                        ? "Pengurus Penyetoran"
                        : user.role === 3
                        ? "Pengurus Penjualan"
                        : user.role === 4
                        ? "Bendahara"
                        : "Super Admin"}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.telepon}</td>
                    <td>{lokasi}</td>
                    <td>
                      <span
                        className="btn btn-secondary m-1"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={(e) => {
                          onSelected(index);
                          e.preventDefault();
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </span>
                      <span
                        className="btn btn-danger m-1"
                        onClick={(e) => {
                          onClickDelete(user.id);
                          e.preventDefault();
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
