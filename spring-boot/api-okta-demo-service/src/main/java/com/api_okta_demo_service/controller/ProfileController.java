package com.api_okta_demo_service.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of("message", "This is public");
    }

    @GetMapping("/me")
    public Map<String, String> getMe(@AuthenticationPrincipal Jwt jwt) {
        String name = jwt.getClaimAsString("name");
        String userEmail = jwt.getClaimAsString("userEmail");

        return Map.of(
                "message",   "You are authenticated!",
                "name",      name != null ? name : "",
                "email", userEmail != null ? userEmail : ""
        );
    }
}
