package com.example.airline_reservation.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;

@Getter
@Setter
@ToString
public class SigninRequest {

    @Email(message = "Invalid email format")
    private String email;
    @Length(min = 3, max = 20, message = "Invalid password length")
    private String password;
}
