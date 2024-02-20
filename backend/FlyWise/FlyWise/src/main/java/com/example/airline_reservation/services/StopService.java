package com.example.airline_reservation.services;

import com.example.airline_reservation.entities.Stop;
import com.example.airline_reservation.repository.StopDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class StopService {
    @Autowired
    StopDaoImpl stopDao;
    public List<String> getStops(){
        return stopDao.getCities();
    }
}
