package com.example.airline_reservation.controllers;

import com.example.airline_reservation.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@CrossOrigin("*")
public class CitiesController {
    @Autowired
    private FlightService service;

    @GetMapping("/cities")
    public Set<String> getcities() {
        return service.getCitites();
    }
}