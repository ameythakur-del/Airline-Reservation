package com.example.airline_reservation.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Integer id;
    Integer numberOfSeatsBooked;
    String type;
    boolean paymentStatus;
    LocalDateTime dateTime;
    Integer flightId;
    Integer sourceNumber;
    Integer destinationNumber;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    StopDTO source;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    StopDTO destination;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Integer paymentId;
    Long userId;

    List<PassengerDTO> passengers;
}
