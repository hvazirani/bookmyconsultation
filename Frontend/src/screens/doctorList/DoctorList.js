import React, { useState, useEffect } from "react";
import "./Doctor.css";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Modal from "react-modal";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

Modal.setAppElement(document.getElementById("root"));

const detailsModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};
const bookingsModal = {
  content: {
    width: "40%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

const DoctorList = ({ baseUrl, getUserAppointments, userAppointments }) => {
  const [speciality, setSpeciality] = useState("");
  const [specialityList, setSpecialityList] = useState([]);
  const [doctorsList, setDoctorList] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const getSpeciality = async () => {
    const url = baseUrl + "doctors/speciality";

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        await setSpecialityList(response);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const getDoctorsList = async () => {
    const url = baseUrl + "doctors";

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        setDoctorList(response);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const getFilteredDoctors = async (query) => {
    const url = baseUrl + "doctors?speciality=" + encodeURI(query);

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        setDoctorList(response);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const changeSpecialityHandler = (event) => {
    setSpeciality(event.target.value);
    getFilteredDoctors(event.target.value);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDoctorsList();
    getSpeciality();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid item xs={12} sm container alignItems="center" direction="column">
        <Typography component="div" id="selectHeading">
          Select Speciality:
        </Typography>
        <Select
          variant="filled"
          labelId="speciality"
          id="speciality"
          value={speciality}
          style={{ minWidth: "200px" }}
          onChange={changeSpecialityHandler}
        >
          <MenuItem key={"spec none"} value={""}>
            NONE
          </MenuItem>
          {specialityList.map((item) => (
            <MenuItem key={"spec" + item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

        {doctorsList.map((doctor) => {
          return (
            <Paper
              key={doctor.id}
              variant="elevation"
              className="doctorListContainer"
              elevation={3}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Doctor Name : {doctor.firstName} {doctor.lastName}
              </Typography>
              <br />
              <Typography component="h4" variant="body1">
                Speciality : {doctor.speciality}
              </Typography>
              <Typography component="h4" variant="body1">
                Rating :
                <Rating name="read-only" value={doctor.rating} readOnly />
              </Typography>
              <Button
                style={{ width: "40%", margin: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setDoctor(doctor);
                  setModalType("bookings");
                  setIsModalOpen(true);
                }}
              >
                Book Appointment
              </Button>
              <Button
                style={{
                  width: "40%",
                  margin: "10px",
                  backgroundColor: "green",
                }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDoctor(doctor);
                  setModalType("details");
                  setIsModalOpen(true);
                }}
              >
                View Details
              </Button>
            </Paper>
          );
        })}
        <Modal
          ariaHideApp={false}
          isOpen={isModalOpen}
          onRequestClose={closeModalHandler}
          style={modalType === "details" ? detailsModal : bookingsModal}
        >
          {modalType === "details" && <DoctorDetails doctor={doctor} />}
          {modalType === "bookings" && (
            <BookAppointment
              baseUrl={baseUrl}
              doctor={doctor}
              getUserAppointments={getUserAppointments}
              userAppointments={userAppointments}
              closeModalHandler={closeModalHandler}
            />
          )}
        </Modal>
      </Grid>
    </div>
  );
};

export default DoctorList;
