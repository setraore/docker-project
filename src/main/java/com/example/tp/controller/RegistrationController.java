package com.example.tp.controller;

import com.example.tp.config.PasswordProps;
import com.example.tp.dto.RegistrationRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    private final PasswordProps passwordProps;

    public RegistrationController(PasswordProps passwordProps) {
        this.passwordProps = passwordProps;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest req) {
        if (req.getBirthDate().isAfter(LocalDate.now())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "La date de naissance ne peut pas être dans le futur."));
        }
        int min = passwordProps.getMinLength();
        String suffix = passwordProps.getSuffix();
        String pwd = req.getPassword();
        if (pwd.length() < min || !pwd.endsWith(suffix)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", String.format("Le mot de passe doit contenir au moins %d caractères et se terminer par %s.", min, suffix)));
        }
        return ResponseEntity.ok(Map.of("message", "Inscription réussie !"));
    }
}
