import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import { Tab, Tabs } from "@material-ui/core";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

const Home = ({ baseUrl }) => {
  const emailId = JSON.parse(sessionStorage.getItem("userId"));
  const [value, setValue] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const tabSwitchHandler = (event, value) => {
    setValue(value);
  };

  const getUserAppointments = async () => {
    const url = `${baseUrl}users/${emailId}/appointments`;
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      const rawResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json;Charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        setUserAppointments(response);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    if (isLogin === true) {
      getUserAppointments();
    }
    // eslint-disable-next-line
  }, [isLogin]);

  return (
    <div>
      <Header baseUrl={baseUrl} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        value={value}
        onChange={tabSwitchHandler}
      >
        <Tab label="Doctors"></Tab>
        <Tab label="Appointment"></Tab>
      </Tabs>
      {value === 0 && (
        <DoctorList
          getUserAppointments={getUserAppointments}
          userAppointments={userAppointments}
          baseUrl={baseUrl}
        />
      )}
      {value === 1 && (
        <Appointment
          userAppointments={userAppointments}
          baseUrl={baseUrl}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};

export default Home;
