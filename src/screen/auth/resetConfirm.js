import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resetConfirm } from "../../services/endpoint/authServices";

function ResetConfirm() {
  // sets the value of "message" to be "saved in browser storage"
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const { token } = useParams();

  const onChangePass = (e) => {
    if (pass === confirm) {
      setLoading(true);
      resetConfirm(token, pass)
        .then((res) =>
          res.code === 200
            ? alert("Berhasil reset password")
            : alert("Gagal Reset Password")
        )
        .catch((e) => alert(JSON.stringify(e.message)))
        .finally(() => setLoading(false));
    } else {
      alert("Isi dengan benar");
    }
    e.preventDefault();
  };

  return (
    <div className="form-screen">
      <a href="index.html" className="easion-logo">
        <img
          src="/logo192.png"
          alt="logo"
          style={{ width: "30px", height: "30px", marginRight: "8px" }}
        />{" "}
        <span>Daur uang</span>
      </a>
      <div className="card account-dialog">
        <div className="card-header bg-primary text-white">
          Konfirmasi Reset Password
        </div>
        <div className="card-body">
          <form action="#!">
            <div className="form-group">
              <input
                required
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Password Baru"
                onInput={(e) => {
                  setPass(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="password"
                className="form-control"
                id="confirm"
                placeholder="Konfirmasi Password"
                onInput={(e) => {
                  setConfirm(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="account-dialog-actions">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onChangePass(e)}
                disabled={loading}
              >
                {!loading ? (
                  "Ubah Kata Sandi"
                ) : (
                  <>
                    <span className="spinner-grow spinner-grow-sm"></span>
                    Mengubah
                  </>
                )}
              </button>
              <Link className="account-dialog-link" to="/login/">
                Login?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetConfirm;
