package com.example.airline_reservation.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SigninResponse {
    private String token;
    private Long userId;
    private String role;
    private String firstName;
    private String lastName, email;
    private String phoneNumber;
}
