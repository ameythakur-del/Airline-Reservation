package com.example.airline_reservation.controllers;


import com.example.airline_reservation.dtos.SigninRequest;
import com.example.airline_reservation.dtos.SigninResponse;
import com.example.airline_reservation.dtos.Signup;
import com.example.airline_reservation.entities.CustomUserDetails;
import com.example.airline_reservation.entities.User;
import com.example.airline_reservation.repository.UserRepository;
import com.example.airline_reservation.security.JwtUtils;
import com.example.airline_reservation.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserSigninSignupContoller {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils utils;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager mgr;

    // sign up
    @PostMapping("/signup")
    public ResponseEntity<?> userSignup(@RequestBody @Valid Signup dto) {
        System.out.println("in sign up " + dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.userRegistration(dto));
    }

    /*
     * request payload : Auth req DTO : email n password resp payload : In case of
     * success : Auth Resp DTO : mesg + JWT token + SC 200 IN case of failure : SC
     * 401
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody @Valid SigninRequest reqDTO) {
        System.out.println("in signin " + reqDTO);
        // simply invoke authenticate(...) on AuthMgr
        // i/p : Authentication => un verifed credentials
        // i/f --> Authentication --> imple by UsernamePasswordAuthToken
        // throws exc OR rets : verified credentials (UserDetails i.pl class: custom
        // user details)

        Authentication verifiedAuth = mgr
                .authenticate(new UsernamePasswordAuthenticationToken
                        (reqDTO.getEmail(), reqDTO.getPassword()));
        System.out.println(verifiedAuth.getClass());
        CustomUserDetails principal = (CustomUserDetails) verifiedAuth.getPrincipal();
        String role = principal.getAuthorities().stream().findFirst().orElseThrow().getAuthority();
        // Custom user details
        // => auth success
//        User user = userRepository.findByEmail(verifiedAuth.getName()).orElseThrow();
        return ResponseEntity
                .ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), principal.getUser().getId(), role, principal.getUser().getFirstName(), principal.getUser().getLastName(), principal.getUser().getEmail(), principal.getUser().getPhoneNumber()));
    }
}