package com.example.airline_reservation.services;

import com.example.airline_reservation.dtos.BookingDTO;
import com.example.airline_reservation.dtos.PaymentDTO;
import com.example.airline_reservation.dtos.UserDaoImpl;
import com.example.airline_reservation.entities.*;
import com.example.airline_reservation.http.Response;
import com.example.airline_reservation.repository.BookingDaoImpl;
import com.example.airline_reservation.repository.FlightDaoImpl;
import com.example.airline_reservation.repository.PaymentDaoImpl;
import com.example.airline_reservation.repository.StopDaoImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.transaction.Transactional;
import java.awt.print.Book;
import java.util.List;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    @Autowired
    FlightDaoImpl flightDao;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    UserDaoImpl userDao;

    @Autowired
    BookingDaoImpl bookingDao;

    @Autowired
    StopDaoImpl stopDao;

    @Autowired
    PaymentDaoImpl paymentDao;

    public Response bookFlight(BookingDTO bookingDto) {
        Booking booking = modelMapper.map(bookingDto, Booking.class);
        User user = userDao.getReferenceById(bookingDto.getUserId());
        Flight flight = flightDao.getReferenceById(bookingDto.getFlightId());

        Stop source = stopDao.getReferenceById(new StopId(bookingDto.getSourceNumber(), flight));

        Stop destination = stopDao.getReferenceById(new StopId(bookingDto.getDestinationNumber(), flight));

        booking.setUser(user);
        booking.setFlight(flight);
        booking.setSource(source);
        booking.setDestination(destination);

        booking.addPassengers();
        booking = bookingDao.save(booking);

        Response response = new Response(booking.getId().toString(), "Created");
//            if(!bodyBooking.equals(null)) {
//                response = new Response(bodyBooking.getId().toString(), "Booking Done");
//            }
//            else{
//                response = new Response("-1", "Booking Failed");
//            }
        return response;
    }

    public Response addPayment(String id, PaymentDTO paymentDTO) {
        Payment payment = modelMapper.map(paymentDTO, Payment.class);

        Booking booking = bookingDao.getReferenceById(Integer.parseInt(id));
        booking.setPayment(payment);
        booking.setPaymentStatus(true);

        return new Response(booking.getPayment().toString(), "Payment Added");
    }


    public Response deleteBooking(String id) {
        Booking booking = bookingDao.getReferenceById(Integer.valueOf(id));
        bookingDao.delete(booking);
        return new Response("1", "Booking rolled back as the payment is not completed");
    }

    public List<BookingDTO> getBookings(String id) {
        User user = userDao.getReferenceById(Long.parseLong(id));
        List<Booking> bookings = bookingDao.findByUserOrderByIdDesc(user);
        List<BookingDTO> bookingDTOS = bookings.stream().map((b) -> modelMapper.map(b, BookingDTO.class)).collect(Collectors.toList());

        return bookingDTOS;
    }
}
