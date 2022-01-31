import React, { useState } from "react";
import RateAppointment from "../appointment/RateAppointment";
import { Paper, Typography, Button } from "@material-ui/core";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

const Appointment = ({ isLogin, baseUrl, userAppointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {!isLogin ? (
        <Typography variant="h6" component="h5" className="noLoginText">
          Login to see appointments
        </Typography>
      ) : userAppointments.length === 0 ? (
        <Typography variant="h6" component="h5" className="noLoginText">
          No Current Appointments to Show.
        </Typography>
      ) : (
        <div>
          {userAppointments.map((appointment) => (
            <Paper
              className="appointmentContainer"
              variant="elevation"
              elevation={3}
              key={appointment.appointmentId}
            >
              <Typography
                variant="h6"
                className="hasTextBlack"
                component="h5"
                gutterBottom
              >
                Dr. {appointment.doctorName}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                Date: {appointment.appointmentDate}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                Symptoms: {appointment.symptoms}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                priorMedicalHistory: {appointment.priorMedicalHistory}
              </Typography>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  toggleModalHandler();
                }}
              >
                Rate Appointment
              </Button>
            </Paper>
          ))}
          <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={toggleModalHandler}
            style={customStyles}
          >
            <RateAppointment
              baseUrl={baseUrl}
              appointment={selectedAppointment}
              toggleModalHandler={toggleModalHandler}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Appointment;
