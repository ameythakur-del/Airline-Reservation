package com.example.airline_reservation.repository;

import com.example.airline_reservation.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDaoImpl extends JpaRepository<Payment, Long> {
}
