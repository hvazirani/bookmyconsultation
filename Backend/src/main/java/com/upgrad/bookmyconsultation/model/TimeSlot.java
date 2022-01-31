package com.upgrad.bookmyconsultation.model;

import com.upgrad.bookmyconsultation.constants.TimeSlotConstants;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Data
@NoArgsConstructor
public class TimeSlot {
	private String doctorId;
	private String availableDate;
	private List<String> timeSlot;

	public TimeSlot(String doctorId, String date) {


		this.availableDate = date;
		this.doctorId = doctorId;

		if (StringUtils.isEmpty(date)) throw new InvalidParameterException("Date is empty");
		if (StringUtils.isEmpty(doctorId)) throw new InvalidParameterException("doctorId is empty");

		int noOfOutput = (doctorId.hashCode() + date.hashCode()) % TimeSlotConstants.AVIAILABLE_TIME_SLOTS.size() + 1;

		timeSlot = getRandomElement(new ArrayList<>(TimeSlotConstants.AVIAILABLE_TIME_SLOTS), noOfOutput);
	}

	private List<String> getRandomElement(List<String> list, int totalItems) {
		Random rand = new Random();

		List<String> newList = new ArrayList<>();
		for (int i = 0; i < totalItems; i++) {

			int randomIndex = rand.nextInt(list.size());

			newList.add(list.get(randomIndex));

			list.remove(randomIndex);
		}
		return newList;
	}


}
