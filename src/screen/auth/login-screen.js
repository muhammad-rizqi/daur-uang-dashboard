import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeToken, setUser } from "../../redux/action";
import { login } from "../../services/endpoint/authServices";
import { getNasabah } from "../../services/endpoint/nasabah";
import {
  getDataPenjualan,
  getSaldoPenjualan,
  getStok,
} from "../../services/endpoint/penjual";
import { getDataSetoran } from "../../services/endpoint/penyetor";
import { getToken } from "../../services/storage/Token";

function Login({ history }) {
  // sets the value of "message" to be "saved in browser storage"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onLoginClick = (e) => {
    setLoading(true);
    login(email, password)
      .then((result) => {
        if (result.code === 200) {
          if (result.data.user.role === 4 || result.data.user.role === 999) {
            if (result.data.user.role === 4) {
              history.push("/bendahara");
            } else if (result.data.user.role === 999) {
              history.push("/admin/");
            } else {
              alert("Mohon masuk di perangkat mobile");
            }
            dispatch(changeToken(result.data.token));
            dispatch(setUser(result.data.user));
            getData();
          }
        } else {
          alert("Gagal Login");
        }
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
    e.preventDefault();
  };

  const onGetToken = (e) => {
    console.log(getToken());
    e.preventDefault();
  };

  const getData = () => {
    getSaldoPenjualan();
    getDataPenjualan();
    getDataSetoran();
    getStok();
    getNasabah();
  };

  return (
    <div className="form-screen">
      <a href="index.html" className="easion-logo">
        <i className="fas fa-sun"></i> <span>Daur uang</span>
      </a>
      <div className="card account-dialog">
        <div className="card-header bg-primary text-white">Please sign in</div>
        <div className="card-body">
          <form action="#!">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="account-dialog-actions">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onLoginClick(e)}
                disabled={loading}
              >
                {!loading ? (
                  "Sign in"
                ) : (
                  <>
                    <span class="spinner-grow spinner-grow-sm"></span>
                    Signing in
                  </>
                )}
              </button>
              <Link
                className="account-dialog-link"
                to="/register/"
                onClick={onGetToken}
              >
                Create an acoount
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
