import React from "react";
import "./Doctor.css";
import { Paper, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const DoctorDetails = ({ doctor }) => {
  return (
    <>
      <Paper className="hasTextBlack">
        <CardHeader className="cardHeader" title="Doctor Details" />
        <CardContent key={doctor.id}>
          <Typography variant="h6" component="h4" gutterBottom>
            Dr. {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="body1">
            Total Experience: {doctor.totalYearsOfExp} years
          </Typography>
          <Typography variant="body1">
            Speciality: {doctor.speciality}
          </Typography>
          <Typography variant="body1">Date of Birth: {doctor.dob}</Typography>
          <Typography variant="body1">City: {doctor.address.city}</Typography>
          <Typography variant="body1">Email: {doctor.emailId}</Typography>
          <Typography variant="body1">Mobile: {doctor.mobile}</Typography>
          <Typography variant="body1">
            Rating: {<Rating name="read-only" value={doctor.rating} readOnly />}
          </Typography>
        </CardContent>
      </Paper>
    </>
  );
};

export default DoctorDetails;
