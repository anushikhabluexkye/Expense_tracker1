import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { TextField, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { reset } from "../features/auth/authSlice";
import CryptoJS from "crypto-js";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (isSuccess || user) {
      history("/dashboard");
    }
    if (isLoading) {
      <Spinner loading={isLoading} />;
    }
    dispatch(reset());
  }, [user, isSuccess, isLoading, history, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formData;
    const secret_key = "this is the secret key";
    const encryptedName = CryptoJS.AES.encrypt(
      JSON.stringify(name),
      secret_key
    ).toString();
    const userData = {
      Email: email,
      Name: encryptedName,
    };
    // const response=dispatch(login(userData))
    // console.log(response)
    dispatch(login(userData)).then(function (payload) {
      // console.log(data)
      const foundUser = payload.payload.find((item) => item.email === email);
      console.log(foundUser);
      const bytes = CryptoJS.AES.decrypt(foundUser.name, secret_key);
      const decryptedName = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedName);
    });
  };
  return (
    <>
      <form className="form">
        <h2>Login</h2>
        <TextField
          type="text"
          required
          id="outlined-required"
          name="email"
          label="Email"
          autoComplete="off"
          placeholder="enter your email"
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          id="outlined-required"
          label="Name"
          type="text"
          name="name"
          placeholder="enter your name"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <Button
          variant="contained"
          onClick={handleSubmit}
          endIcon={<LoginIcon />}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
