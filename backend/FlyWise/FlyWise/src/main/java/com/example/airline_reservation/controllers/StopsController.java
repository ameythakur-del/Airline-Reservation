package com.example.airline_reservation.controllers;

import com.example.airline_reservation.entities.Stop;
import com.example.airline_reservation.services.StopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/cities")
@CrossOrigin(origins = "*")
public class StopsController {
    @Autowired
    StopService stopService;
    @GetMapping
    public List<String> getStops(){
        return stopService.getStops();
    }
}
