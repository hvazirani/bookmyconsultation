package com.upgrad.bookmyconsultation;

import com.upgrad.bookmyconsultation.config.ApiConfiguration;
import com.upgrad.bookmyconsultation.config.WebConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({ApiConfiguration.class, WebConfiguration.class})
public class BookmyconsultationApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookmyconsultationApplication.class, args);
	}

}
