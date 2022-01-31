package com.upgrad.bookmyconsultation.service;

import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.exception.InvalidInputException;
import com.upgrad.bookmyconsultation.repository.DoctorRepository;
import com.upgrad.bookmyconsultation.repository.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class RatingsService {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private RatingsRepository ratingsRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	
	//create a method name submitRatings with void return type and parameter of type Rating
		//set a UUID for the rating
		//save the rating to the database
		//get the doctor id from the rating object
		//find that specific doctor with the using doctor id
		//modify the average rating for that specific doctor by including the new rating
		//save the doctor object to the database
	public void submitRatings(Rating rating) throws InvalidInputException {
		rating.setId(UUID.randomUUID().toString());
		Rating savedRating = ratingsRepository.save(rating);
		Optional<Doctor> response = doctorRepository.findById(savedRating.getDoctorId());
		if(response.isPresent()){
			Doctor doctor = response.get();
			int numOfRatings = ratingsRepository.findByDoctorId(doctor.getId()).size();
			Double newRating = (doctor.getRating()*(numOfRatings-1) + savedRating.getRating())/numOfRatings;
			doctor.setRating(newRating);
			doctorRepository.save(doctor);
		}
		else throw new InvalidInputException(new ArrayList<String>());
	}
	

}

