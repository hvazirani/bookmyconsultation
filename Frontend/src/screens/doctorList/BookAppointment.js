import React, { useState, useEffect } from "react";
import {
  Paper,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const BookAppointment = ({
  baseUrl,
  doctor,
  getUserAppointments,
  userAppointments,
  closeModalHandler,
}) => {
  let doctorName = `${doctor.firstName} ${doctor.lastName}`;
  const dateFormatter = (date) => {
    let dateArray = date.toLocaleDateString().split("/");
    let newDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    return newDate;
  };
  const currentUserAppoinments = userAppointments;
  const [selectedDate, setSelectedDate] = useState(dateFormatter(new Date()));
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState(["None"]);
  const [medicalHistory, setMedicalHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [slotRequiredClass, setSlotRequiredClass] = useState("none");
  const [bookedSuccessfully, setBookedSuccessfully] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(dateFormatter(date));
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
    setSlotRequiredClass("none");
  };

  const getAvailableSlots = async () => {
    const url = `${baseUrl}doctors/${doctor.id}/timeSlots?date=${selectedDate}`;

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        setAvailableSlots(response.timeSlot);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const bookAppointmentHandler = async (e) => {
    if (e) e.preventDefault();

    // Validation
    if (
      selectedSlot === "None" ||
      selectedSlot === null ||
      selectedSlot === ""
    ) {
      setSlotRequiredClass("block");
      return;
    }
    const emailId = JSON.parse(sessionStorage.getItem("userId"));
    const userDetails = JSON.parse(sessionStorage.getItem("user-details"));
    const accessToken = sessionStorage.getItem("accessToken");
    // Allow only logged in user to Book appointment
    if (emailId == null || userDetails == null || accessToken == null) {
      alert("Please Login to Book an appointment");
      closeModalHandler();
      return;
    }

    // Check if user already has appointment for the same date-time
    const existingBooking = currentUserAppoinments.filter((appt) => {
      if (
        appt.appointmentDate === selectedDate &&
        appt.timeSlot === selectedSlot
      ) {
        return appt;
      }
      return null;
    });

    if (existingBooking.length > 0) {
      alert("Either the slot is already booked or not available");
      return;
    }

    let data = {
      doctorId: doctor.id,
      doctorName: doctorName,
      userId: emailId,
      userName: `${userDetails.firstName} ${userDetails.lastName}`,
      timeSlot: selectedSlot,
      createdDate: dateFormatter(new Date()),
      appointmentDate: selectedDate,
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory,
    };

    const url = baseUrl + "appointments";
    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (rawResponse.ok) {
        setBookedSuccessfully(true);
        getUserAppointments();
        setTimeout(function () {
          closeModalHandler();
        }, 1000);
      }
      if (rawResponse.status === 400) {
        alert("Bad Request");
      }
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    getAvailableSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div>
      <Paper className="bookingModal">
        <CardHeader className="cardHeader" title="Book an Appointment" />
        <CardContent key={doctor.id}>
          <form noValidate autoComplete="off" onSubmit={bookAppointmentHandler}>
            <div>
              <TextField
                disabled
                id="standard-disabled"
                label="DoctorName"
                required
                value={doctorName}
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <FormControl>
                <InputLabel id="timeSlotInput">Time Slot</InputLabel>
                <Select
                  labelId="timeSlotInput"
                  id="timeSlotInput"
                  value={selectedSlot}
                  onChange={handleSlotChange}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {availableSlots.map((slot, key) => (
                    <MenuItem key={key} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className={slotRequiredClass}>
                  <span className="red">Select a time slot</span>
                </FormHelperText>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <TextField
                  id="standard-multiline-static"
                  label="Medical History"
                  multiline
                  rows={4}
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                />
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <TextField
                  id="standard-multiline-static"
                  label="Symptoms"
                  multiline
                  rows={4}
                  value={symptoms}
                  placeholder="ex.Cold, Swelling, etc"
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </FormControl>
            </div>
            <br />
            {bookedSuccessfully === true && (
              <FormControl>
                <span>Appointment booked successfully.</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button
              id="bookappointment"
              type="submit"
              variant="contained"
              color="primary"
            >
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Paper>
    </div>
  );
};

export default BookAppointment;
