package com.upgrad.bookmyconsultation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	@Id
	private String id;
	private String addressLine1;
	private String addressLine2;
	private String city;
	private String state;
	private String postcode;

	public static Address copyAddress(Address address){
		Address newAddress = new Address();
		newAddress.setId(UUID.randomUUID().toString());
		newAddress.setAddressLine1(address.getAddressLine1());
		newAddress.setAddressLine2(address.getAddressLine2());
		newAddress.setCity(address.getCity());
		newAddress.setState(address.getState());
		newAddress.setPostcode(address.getPostcode());
		return newAddress;
	}
}
