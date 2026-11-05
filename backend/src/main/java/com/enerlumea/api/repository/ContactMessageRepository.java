package com.enerlumea.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enerlumea.api.model.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
