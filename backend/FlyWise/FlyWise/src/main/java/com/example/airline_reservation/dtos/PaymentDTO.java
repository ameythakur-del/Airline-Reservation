package com.example.airline_reservation.dtos;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PaymentDTO {
    String transactionNumber;
    LocalDateTime date;
    float totalAmount;
}
