package com.example.airline_reservation.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassengerDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Long id;
    String name;
    String gender;
    Integer age;
    Integer seatNumber;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Integer bookingId;
}
