import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, setUser } from "../redux/action";
import { reverseGeo } from "../services/API/geolocation";
import { profile } from "../services/endpoint/authServices";
import {
  changePassword,
  deleteAcount,
  updateProfile,
} from "../services/endpoint/user";

const Profile = () => {
  const { user } = useSelector((state) => state);
  const [name, setName] = useState(user.nama_lengkap);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.telepon);
  const [mapsData, setMapsData] = useState(JSON.parse(user.lokasi));
  const [loading, setLoading] = useState(false);

  const [changePass, setChangePass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [deletePass, setDeletePass] = useState("");

  const dispatch = useDispatch();

  const getLocation = (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((coord) =>
        reverseLocation(coord.coords)
      );
    } else {
      alert("Tidak bisa mengambil lokasi");
    }
    e.preventDefault();
  };

  const updateData = async () => {
    const res = await profile();
    res.code === 200 && dispatch(setUser(res.data.user));
  };

  const onClickUpdate = async (e) => {
    if ((name, email, phone, mapsData)) {
      setLoading(true);
      try {
        const resUpdate = await updateProfile(
          user.id,
          name,
          email,
          phone,
          mapsData
        );
        if (resUpdate.code === 200) {
          setLoading(false);
          updateData();
          alert("Berhasil diupdate");
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

  const onClickChange = (e) => {
    setLoading(true);
    changePassword(user.id, changePass, newPass, confirmPass)
      .then((res) => {
        if (res.code === 200) {
          alert("Berhasil merubah password\n Silahkan login kembali");
          dispatch(clearToken());
        } else {
          alert("Gagal merubah password");
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        alert("Gagal menyambung ke server");
        console.log(e);
      });
    e.preventDefault();
  };

  const onClickRemove = (e) => {
    setLoading(true);
    deleteAcount(user.id, deletePass)
      .then((res) => {
        if (res.code === 200) {
          alert("Berhasil menghapus akun");
          dispatch(clearToken());
        } else {
          alert("Periksa password kembali");
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        alert("Gagal menyambung ke server");
        console.log(e);
      });
    e.preventDefault();
  };

  const reverseLocation = (coord, place) => {
    console.log(place);
    reverseGeo(coord)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setMapsData({
          latitude: response.lat,
          longitude: response.lon,
          place_id: place ? place.placeId : null,
          name: place ? place.name : response.display_name,
        });
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <div className="card easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="easion-card-title"> Update Profile </div>
        </div>
        <div className="card-body ">
          <form>
            <div className="form-group">
              <label htmlFor="nama-lengkap">Kata Sandi Lama</label>
              <input
                type="text"
                className="form-control"
                id="nama-lengkap"
                placeholder="Masukkan Kata Sandi Lama"
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
              <p>Lokasi : {mapsData.name}</p>
              <button
                className="btn btn-primary"
                onClick={(e) => getLocation(e)}
              >
                Ganti Lokasi
              </button>
            </div>
            <div className="form-group">
              <iframe
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src={
                  "https://www.google.com/maps/embed/v1/search?key=AIzaSyBaixeWDCsjrPYdXBeYZFPpTv0A1G82ZR8&q=" +
                  mapsData.latitude +
                  "," +
                  mapsData.longitude
                }
                allowFullScreen
                title="Gmaps"
              ></iframe>
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
      <div className="card easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="easion-card-title"> Ubah Kata Sandi </div>
        </div>
        <div className="card-body ">
          <form>
            <div className="form-group">
              <label htmlFor="old-password">Kata Sandi Lama</label>
              <input
                type="password"
                className="form-control"
                id="old-password"
                placeholder="Masukkan Kata Sandi Lama"
                value={changePass}
                onInput={(e) => {
                  setChangePass(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">Kata Sandi Baru</label>
              <input
                type="password"
                className="form-control"
                id="new-password"
                placeholder="Kata Sandi Baru"
                value={newPass}
                onInput={(e) => {
                  setNewPass(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Konfirmasi Kata Sandi"
                value={confirmPass}
                onInput={(e) => {
                  setConfirmPass(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={onClickChange}
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
      <div className="card easion-card">
        <div className="card-header">
          <div className="easion-card-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="easion-card-title"> Hapus Akun </div>
        </div>
        <div className="card-body ">
          <form>
            <div className="form-group">
              <label htmlFor="delete-account">
                Masukkan Kata Sandi Untuk Menghapus Akun
              </label>
              <input
                type="password"
                className="form-control"
                id="delete-account"
                placeholder="Masukkan Kata Sandi"
                value={deletePass}
                onInput={(e) => {
                  setDeletePass(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={onClickRemove}
            >
              {!loading ? (
                "Delete"
              ) : (
                <>
                  <span className="spinner-grow spinner-grow-sm"></span>
                  Delete
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
