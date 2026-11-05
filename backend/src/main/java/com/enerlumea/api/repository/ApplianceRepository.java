package com.enerlumea.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enerlumea.api.model.Appliance;

public interface ApplianceRepository extends JpaRepository<Appliance, Long> {
    List<Appliance> findAllByOrderByIdAsc();
}
