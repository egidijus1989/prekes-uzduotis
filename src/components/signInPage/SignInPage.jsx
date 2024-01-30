import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/UserSlice.js";
import * as service from "../../servises/Auth.js";

export default function SignInPage() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const singIn = (e) => {
    e.preventDefault();
    service.singInSubmit(
      formData,
      dispatch,
      signInStart,
      signInSuccess,
      signInFailure
    );
    navigate("/");
  };
  return (
    <div className="container">
      <h2 className="mt-3 text-center">Prisijungti</h2>
      <form className="form" onSubmit={singIn}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Jūsų elektroninis paštas"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="********"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Prisijungti
          </button>
        </div>
        <div className="mb-3">
          <p>
            Dar ne narys? <Link to={"/register"}>Registruokis</Link>
          </p>
        </div>
      </form>
      {errorMessage && (
        <p className="mt-5" color="failure">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
