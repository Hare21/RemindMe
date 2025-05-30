package com.example.RemindMeApp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    public RemindService remindService;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;


    @PostMapping("/register")
    public ResponseEntity<String> userRegister(@RequestBody User user) {
        if (isNullOrBlankCheck(user.getName()) || isNullOrBlankCheck(user.getEmailId())
                ||isNullOrBlankCheck(user.getPassword())) {
            return new ResponseEntity<>("All fields are required", HttpStatus.BAD_REQUEST);
        }
        Optional<User> existingUser = userRepository.findByEmailId(user.getEmailId());
        if (existingUser.isPresent()) {
            log.warn("Attempting to login with same email Id : {}" , user.getEmailId());
            return new ResponseEntity<>("Please user differenr email to resgiter", HttpStatus.CONFLICT);
        }
        remindService.userRegister(user.getName(), user.getEmailId(), user.getPassword());
        return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);

    }
    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody User user) {
        Optional<User> registeredUser = userRepository.findByEmailIdOrName(user.getEmailId(), user.getName());

        if(!registeredUser.isPresent()) {
            log.warn("user  doesn't exist. Please register first before you login : {} ",user.getEmailId());
            return new ResponseEntity<>("not a registered user", HttpStatus.CONFLICT);
        }

        User dbUser = registeredUser.get();

        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            log.warn("Incorrect password for email: {}", user.getEmailId());
            return new ResponseEntity<>("Not correct credentials", HttpStatus.UNAUTHORIZED);
        }

        log.info("User logged in successfully: {}", user.getEmailId());
        return new ResponseEntity<>("Login successful!", HttpStatus.OK);
    }

    public boolean isNullOrBlankCheck(String var) {
     return var == null || var.isBlank();
    }
}
