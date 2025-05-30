package com.example.RemindMeApp;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class RemindService {

    private static final Logger log = LoggerFactory.getLogger(RemindService.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
   public PasswordEncoder passwordEncoder;


    public void userRegister(String name, String email, String password) {
            User user = new User();
            user.setName(name);
            user.setEmailId(email);
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            System.out.println("User registered successfully!");

    }

}
