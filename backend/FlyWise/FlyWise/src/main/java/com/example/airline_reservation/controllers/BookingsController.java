package com.example.airline_reservation.controllers;

import com.example.airline_reservation.dtos.BookingDTO;
import com.example.airline_reservation.dtos.PaymentDTO;
import com.example.airline_reservation.http.Response;
import com.example.airline_reservation.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin("*")
public class BookingsController {
    @Autowired
    BookingService bookingService;

    @PostMapping
    public Response bookFlight(@RequestBody BookingDTO bookingDto) {
        return bookingService.bookFlight(bookingDto);
    }

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getBookings(@RequestParam String uid){
        return ResponseEntity.ok(bookingService.getBookings(uid));
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
