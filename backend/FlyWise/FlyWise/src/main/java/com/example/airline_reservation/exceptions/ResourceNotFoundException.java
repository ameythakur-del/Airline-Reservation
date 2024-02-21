package com.example.airline_reservation.exceptions;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Getter
@Setter
@NoArgsConstructor
public class ResourceNotFoundException extends RuntimeException {
    private int statusCode;
    private String message;

    public ResourceNotFoundException(int statusCode, String message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
