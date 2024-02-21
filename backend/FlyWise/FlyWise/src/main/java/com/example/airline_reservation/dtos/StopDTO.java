package com.example.airline_reservation.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StopDTO {
    String stopName;
    int stopNumber;
    LocalDateTime arrivalDateTime, departureDateTime;
    Integer stopIdFlightId;
}
