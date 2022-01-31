import React, { useState } from "react";
import ErrorPopover from "../../common/ErrorPopover";

import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

const Login = ({ loginUser, isLogin }) => {
  const [email, setEmail] = useState("");
  const [invalidEmailClass, setInvalidEmailClass] = useState("none");
  const [password, setPassword] = useState("");

  // Error Popoup State
  const [anchorEl, setAnchorEl] = useState(null);

  const setParentAnchorElNull = () => {
    setAnchorEl(null);
  };

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    setInvalidEmailClass("none");
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (e) => {
    if (e) e.preventDefault();

    // validate data
    if (email === "") {
      setAnchorEl(e.currentTarget.children[0]);
      return;
    }
    if (password === "") {
      setAnchorEl(e.currentTarget.children[2]);
      return;
    }
    const emailPattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;

    if (!email.match(emailPattern)) {
      setInvalidEmailClass("block");
      return;
    } else {
      setInvalidEmailClass("none");
    }
    loginUser(email, password);
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={loginHandler}>
        <FormControl required margin="dense">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            type="email"
            onChange={changeEmailHandler}
          />

          {email.length >= 1 && invalidEmailClass === "block" && (
            <FormHelperText className={invalidEmailClass}>
              <span className="red">Enter valid Email</span>
            </FormHelperText>
          )}
          <ErrorPopover
            anchor={anchorEl}
            setParentAnchorElNull={setParentAnchorElNull}
          />
        </FormControl>
        <br />
        <FormControl required margin="dense">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={changePasswordHandler}
          />
          <ErrorPopover
            anchor={anchorEl}
            setParentAnchorElNull={setParentAnchorElNull}
          />
        </FormControl>
        <br />
        <br />

        {isLogin === true && (
          <FormControl>
            <span>Login Successful.</span>
          </FormControl>
        )}
        <br />
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default Login;
