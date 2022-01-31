/*
 * Copyright 2017-2018, Redux Software.
 *
 * File: ErrorResponseBuilder.java
 * Date: Oct 13, 2017
 * Author: P7107311
 * URL: www.redux.com
 */
package com.upgrad.bookmyconsultation.controller.ext;

import com.upgrad.bookmyconsultation.exception.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Error response builder.
 */
public class ErrorResponseBuilder<E extends ApplicationException> {

	private final HttpStatus status;
	private ErrorResponse errorResponse;

	public ErrorResponseBuilder(final HttpStatus status) {
		this.status = status;
	}

	public ErrorResponseBuilder<E> payload(E exc) {
		this.errorResponse = new ErrorResponse().code(exc.getErrorCode().getCode()).message(exc.getMessage());
		return this;
	}

	public ResponseEntity<ErrorResponse> build() {
		return new ResponseEntity<ErrorResponse>(errorResponse, null, status);
	}

}