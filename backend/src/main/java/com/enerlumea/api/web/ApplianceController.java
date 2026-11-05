package com.enerlumea.api.web;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
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

import com.enerlumea.api.model.Appliance;
import com.enerlumea.api.repository.ApplianceRepository;

@RestController
@RequestMapping("/api/appliances")
public class ApplianceController {
    private final ApplianceRepository appliances;

    public ApplianceController(ApplianceRepository appliances) {
        this.appliances = appliances;
    }

    @GetMapping
    public List<Appliance> list() {
        return appliances.findAllByOrderByIdAsc();
    }

    @PostMapping
    public ResponseEntity<Appliance> create(@Valid @RequestBody Appliance appliance) {
        appliance.setId(null);
        Appliance saved = appliances.save(appliance);
        return ResponseEntity.created(URI.create("/api/appliances/" + saved.getId()))
                .body(saved);
    }

    @PutMapping("/{id}")
    public Appliance update(@PathVariable Long id, @Valid @RequestBody Appliance appliance) {
        requireAppliance(id);
        appliance.setId(id);
        return appliances.save(appliance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Appliance appliance = requireAppliance(id);
        appliances.delete(appliance);
        return ResponseEntity.noContent().build();
    }

    private Appliance requireAppliance(Long id) {
        return appliances.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Appliance not found."));
    }
}
