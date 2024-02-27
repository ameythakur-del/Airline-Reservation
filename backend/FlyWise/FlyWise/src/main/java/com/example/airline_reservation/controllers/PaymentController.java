package com.example.airline_reservation.controllers;

import com.example.airline_reservation.dtos.PaymentDTO;
import com.example.airline_reservation.entities.Booking;
import com.example.airline_reservation.http.Response;
import com.example.airline_reservation.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    BookingService bookingService;

    @PostMapping
    public ResponseEntity<Response> addPayment(@RequestParam String id, @RequestBody PaymentDTO paymentDTO){
        return ResponseEntity.ok(bookingService.addPayment(id, paymentDTO));
    }

    @DeleteMapping
    public ResponseEntity<Response> deleteBooking(@RequestParam String id){
        return ResponseEntity.ok(bookingService.deleteBooking(id));
    }
}
