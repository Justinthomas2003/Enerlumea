package com.enerlumea.api.web;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.enerlumea.api.model.ContactMessage;
import com.enerlumea.api.repository.ContactMessageRepository;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {
    private final ContactMessageRepository messages;

    public ContactMessageController(ContactMessageRepository messages) {
        this.messages = messages;
    }

    @PostMapping
    public ResponseEntity<ContactReceipt> submit(@Valid @RequestBody ContactMessage message) {
        message.setId(null);
        ContactMessage saved = messages.save(message);
        return ResponseEntity.accepted()
                .body(new ContactReceipt(saved.getId(), saved.getSubmittedAt()));
    }
}
