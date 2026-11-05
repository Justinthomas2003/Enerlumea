package com.enerlumea.api.web;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.enerlumea.api.model.EnergyRecord;
import com.enerlumea.api.repository.EnergyRecordRepository;

@RestController
@RequestMapping("/api/energy-records")
public class EnergyRecordController {
    private final EnergyRecordRepository records;

    public EnergyRecordController(EnergyRecordRepository records) {
        this.records = records;
    }

    @GetMapping
    public List<EnergyRecord> list() {
        return records.findAllByOrderByDateAscIdAsc();
    }

    @PostMapping
    public ResponseEntity<EnergyRecord> create(@Valid @RequestBody EnergyRecord record) {
        record.setId(null);
        EnergyRecord saved = records.save(record);
        return ResponseEntity.created(URI.create("/api/energy-records/" + saved.getId()))
                .body(saved);
    }

    @PutMapping("/{id}")
    public EnergyRecord update(@PathVariable Long id, @Valid @RequestBody EnergyRecord record) {
        requireRecord(id);
        record.setId(id);
        return records.save(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        EnergyRecord record = requireRecord(id);
        records.delete(record);
        return ResponseEntity.noContent().build();
    }

    private EnergyRecord requireRecord(Long id) {
        return records.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Energy record not found."));
    }
}
