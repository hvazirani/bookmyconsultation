package com.upgrad.bookmyconsultation.servlet;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

import static com.upgrad.bookmyconsultation.constants.ResourceConstants.BASE_URL_PATTERN;
import static com.upgrad.bookmyconsultation.constants.ResourceConstants.HEADER_REQUEST_ID;


@WebFilter(filterName = "RequestContextFilter", urlPatterns = BASE_URL_PATTERN)
public class RequestContextFilter extends ApiFilter {

    @Override
    public void doFilter(HttpServletRequest servletRequest, HttpServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        if (servletRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
            servletResponse.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        servletResponse.addHeader(HEADER_REQUEST_ID, UUID.randomUUID().toString());
        filterChain.doFilter(servletRequest, servletResponse);
    }

}
