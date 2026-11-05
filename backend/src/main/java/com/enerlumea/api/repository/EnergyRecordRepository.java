package com.enerlumea.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enerlumea.api.model.EnergyRecord;

public interface EnergyRecordRepository extends JpaRepository<EnergyRecord, Long> {
    List<EnergyRecord> findAllByOrderByDateAscIdAsc();
}
