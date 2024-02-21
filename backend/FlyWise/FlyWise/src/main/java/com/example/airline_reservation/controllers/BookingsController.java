package com.example.airline_reservation.controllers;

import com.example.airline_reservation.dtos.BookingDTO;
import com.example.airline_reservation.http.Response;
import com.example.airline_reservation.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class BookingsController {
    @Autowired
    BookingService bookingService;

    @PostMapping
    public Response bookFlight(@RequestBody BookingDTO bookingDto) {
        return bookingService.bookFlight(bookingDto);
    }

//    @ExceptionHandler(value
//            = ResourceNotFoundException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ResourceNotFoundException
//    handleCustomerAlreadyExistsException(
//            ResourceNotFoundException ex)
//    {
//        return new ResourceNotFoundException(HttpStatus.NO_CONTENT.value(),
//                ex.getMessage());
//    }
}
