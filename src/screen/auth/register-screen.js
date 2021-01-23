import { Link } from "react-router-dom";

function Register() {
  // sets the value of "message" to be "saved in browser storage"
  return (
    <div className="form-screen">
      <a href="index.html" className="easion-logo">
        <i className="fas fa-sun"></i> <span>Daur uang</span>
      </a>
      <div className="card account-dialog">
        <div className="card-header bg-primary text-white">Register</div>
        <div className="card-body">
          <form action="#!">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="account-dialog-actions">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
              <Link className="account-dialog-link" to="/login/">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
