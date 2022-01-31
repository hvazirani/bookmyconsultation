/*
 * Copyright 2017-2018, Redux Software.
 *
 * File: AuthenticationController.java
 * Date: Sep 28, 2017
 * Author: P7107311
 * URL: www.redux.com
 */
package com.upgrad.bookmyconsultation.controller;

import com.upgrad.bookmyconsultation.exception.ApplicationException;
import com.upgrad.bookmyconsultation.model.AuthorizedUser;
import com.upgrad.bookmyconsultation.provider.BasicAuthDecoder;
import com.upgrad.bookmyconsultation.provider.BearerAuthDecoder;
import com.upgrad.bookmyconsultation.service.AuthTokenService;
import com.upgrad.bookmyconsultation.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private AuthTokenService authTokenService;

	@PostMapping(path = "/login")
	public ResponseEntity<AuthorizedUser> login(@RequestHeader final String authorization) throws ApplicationException {
		final BasicAuthDecoder basicAuthDecoder = new BasicAuthDecoder(authorization);
		final AuthorizedUser authorizedUser = authenticationService.authenticate(basicAuthDecoder.getEmail(), basicAuthDecoder.getPassword());
		return ResponseEntity.status(HttpStatus.OK).body(authorizedUser);
	}

	@PostMapping(path = "/logout")
	public void logout(@RequestHeader final String authorization) throws ApplicationException {
		final BearerAuthDecoder authDecoder = new BearerAuthDecoder(authorization);
		authTokenService.invalidateToken(authDecoder.getAccessToken());
	}


}