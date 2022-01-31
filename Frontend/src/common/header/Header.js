import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/logo.jpeg";
import Modal from "react-modal";
import {
  Button,
  Tabs,
  Tab,
  CardHeader,
  CardContent,
  Card,
} from "@material-ui/core";
import TabContainer from "../tabContainer/TabContainer";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Header = ({ baseUrl, isLogin, setIsLogin }) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);

  // Toggle Modal Status
  const toggleModalHandler = () => {
    setOpenModal(!openModal);
  };

  // Switch modal Tabs
  const tabSwitchHandler = (event, value) => {
    setValue(value);
  };

  // Logout User
  const logoutHandler = async () => {
    const url = baseUrl + "auth/logout";
    const params = sessionStorage.getItem("accessToken");

    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${params}`,
        },
      });

      if (rawResponse.ok) {
        sessionStorage.removeItem("user-details");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("accessToken");
        setIsLogin(false);

      } else {
        const error = new Error();
        error.message = "Something went wrong.";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };


  const loginUser = async (email, password) => {
    const url = baseUrl + "auth/login";


    const params = window.btoa(email + ":" + password);

    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Basic ${params}`,
        },
      });

      if (rawResponse.ok) {
        const response = await rawResponse.json();

        window.sessionStorage.setItem("user-details", JSON.stringify(response));
        window.sessionStorage.setItem("userId", JSON.stringify(response.id));
        window.sessionStorage.setItem("accessToken", response.accessToken);
        setIsLogin(true);
        setTimeout(function () {
          toggleModalHandler();
        }, 2000);
      } else {
        const error = new Error();
        error.message = "Something went wrong.";
        throw error;
      }
    } catch (e) {
      alert(`${e.message} Please enter correct details.`);
    }
  };

  // Get Login state at render
  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("accessToken") == null ? false : true;
    setIsLogin(isLoggedIn);
  }, [setIsLogin]);

  return (
    <div>
      <header className="header">
        <span>
          <img src={logo} className="logo" alt="logo" />
          <span className="brandTitle">Doctor Finder</span>
        </span>

        <div className="login-button">
          {/* Display login/logout button based on Auth status */}
          {!isLogin === true ? (
            <Button
              variant="contained"
              color="primary"
              onClick={toggleModalHandler}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
        </div>
      </header>
      <Modal
        ariaHideApp={false}
        isOpen={openModal}
        onRequestClose={toggleModalHandler}
        style={customStyles}
      >
        <Card>
          <CardHeader className="cardHeader" title="Authentication" />
          <CardContent>
            <Tabs value={value} onChange={tabSwitchHandler}>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <TabContainer>
              {value === 0 && <Login loginUser={loginUser} isLogin={isLogin} />}
              {value === 1 && (
                <Register
                  baseUrl={baseUrl}
                  toggleModalHandler={toggleModalHandler}
                  loginUser={loginUser}
                />
              )}
            </TabContainer>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default Header;
