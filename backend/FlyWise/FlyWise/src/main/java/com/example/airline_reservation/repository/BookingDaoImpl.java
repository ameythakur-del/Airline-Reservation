package com.example.airline_reservation.repository;

import com.example.airline_reservation.entities.Booking;
import com.example.airline_reservation.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingDaoImpl extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserOrderByIdDesc(User user);
}
