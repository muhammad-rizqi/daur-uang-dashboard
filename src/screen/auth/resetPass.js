import { useState } from "react";
import { Link } from "react-router-dom";
import { reset } from "../../services/endpoint/authServices";

function ResetPass() {
  // sets the value of "message" to be "saved in browser storage"
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickReset = (e) => {
    if (email) {
      setLoading(true);
      reset(email)
        .then((res) =>
          res.code === 200
            ? alert("Link reset password dikirim ke email")
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
        <div className="card-header bg-primary text-white">Reset Password</div>
        <div className="card-body">
          <form action="#!">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Masukkan Email"
                onInput={(e) => {
                  setEmail(e.target.value);
                  e.preventDefault();
                }}
              />
            </div>
            <div className="account-dialog-actions">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onClickReset(e)}
                disabled={loading}
              >
                {!loading ? (
                  "Kirim Token Reset"
                ) : (
                  <>
                    <span className="spinner-grow spinner-grow-sm"></span>
                    Mengirim
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

export default ResetPass;
