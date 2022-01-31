package com.upgrad.bookmyconsultation.util;

import com.upgrad.bookmyconsultation.entity.Appointment;
import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.entity.User;
import com.upgrad.bookmyconsultation.exception.InvalidInputException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Component
public class ValidationUtils {

	public static void validate(User user) throws InvalidInputException {
		List<String> errorFields = new ArrayList<>();
		if (user.getEmailId() == null || !user.getEmailId().matches("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")) {
			errorFields.add("Email Id");
		}

		if (user.getMobile() == null || !user.getMobile().matches("^\\d{10}$")) {
			errorFields.add("Mobile");
		}

		if (user.getFirstName() == null || !user.getFirstName().matches("^[a-zA-Z\\\\s]{1,10}$")) {
			errorFields.add("First Name");
		}
		if (user.getLastName() == null || !user.getLastName().matches("^[a-zA-Z\\\\s]{1,10}$")) {
			errorFields.add("Last Name");
		}
		if (errorFields.size() > 0) throw new InvalidInputException(errorFields);
	}

	public static void validate(Doctor doctor) throws InvalidInputException {
		List<String> errorFields = new ArrayList<>();
		if (doctor.getMobile() == null || !doctor.getMobile().matches("^\\d{10}$")) {
			errorFields.add("Mobile");
		}
		if (doctor.getFirstName() == null || !doctor.getFirstName().matches("^[a-zA-Z\\\\s]{1,10}$")) {
			errorFields.add("First Name");
		}
		if (doctor.getLastName() == null || !doctor.getLastName().matches("^[a-zA-Z\\\\s]{1,10}$")) {
			errorFields.add("Last Name");
		}
		if (doctor.getDob() == null || !isValid(doctor.getDob())) {
			errorFields.add("Date Of Birth");
		}
		if (doctor.getPan() == null || !doctor.getPan().matches("[A-Z]{5}[0-9]{4}[A-Z]{1}")) {
			errorFields.add("PAN");
		}
		if (doctor.getEmailId() == null || !doctor.getEmailId().matches("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")) {
			errorFields.add("Email Id");
		}
		if (errorFields.size() > 0) throw new InvalidInputException(errorFields);
	}

	public static void validate(Appointment appointment) throws InvalidInputException {
		List<String> errorFields = new ArrayList<>();
		if (StringUtils.isEmpty(appointment.getDoctorId())) {
			errorFields.add("Doctor ID");
		}

		if (StringUtils.isEmpty(appointment.getUserId())) {
			errorFields.add("User ID");
		}

		if (StringUtils.isEmpty(appointment.getTimeSlot())) {
			errorFields.add("Time slot");
		}
		if (appointment.getAppointmentDate() == null || !isValid(appointment.getAppointmentDate())) {
			errorFields.add("AppointmentDate");
		}

		if (errorFields.size() > 0) throw new InvalidInputException(errorFields);
	}

	public static boolean isValid(String dateStr) {
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sdf.setLenient(false);
		try {
			sdf.parse(dateStr);
		} catch (ParseException e) {
			return false;
		}
		return true;
	}
}
