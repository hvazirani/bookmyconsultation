package com.upgrad.bookmyconsultation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
	@Id
	private String appointmentId = UUID.randomUUID().toString();
	private String doctorId;
	private String doctorName;
	private String userId;
	private String userName;
	private String userEmailId;
	private String timeSlot;
	private String status;
	private String appointmentDate;
	@JsonIgnore
	private String createdDate;
	private String symptoms;
	private String priorMedicalHistory;

}
