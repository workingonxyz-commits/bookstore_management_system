package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Repository.UserRepository;
import com.example.demo.model.User;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository repo;

    // ✅ SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return repo.save(user);
    }

    // ✅ LOGIN (FIXED - NO SERVER ERROR)
    @PostMapping("/login")
    public boolean login(@RequestBody User user) {

        User existing = repo.findByUsername(user.getUsername());

        // 🔥 prevent crash if user not found
        if (existing == null) {
            return false;
        }

        // 🔥 prevent null pointer
        if (existing.getPassword() == null || user.getPassword() == null) {
            return false;
        }

        return existing.getPassword().equals(user.getPassword());
    }
}