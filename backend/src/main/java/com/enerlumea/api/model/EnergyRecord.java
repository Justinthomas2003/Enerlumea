package com.enerlumea.api.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "energy_records")
public class EnergyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String name;

    @NotBlank
    @Pattern(regexp = "Consumption|Generation")
    @Column(nullable = false, length = 20)
    private String type;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @NotNull
    @DecimalMin("0.01")
    @Column(nullable = false, precision = 12, scale = 3)
    private BigDecimal energy;

    @Size(max = 1000)
    @Column(length = 1000)
    private String notes = "";

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public BigDecimal getEnergy() { return energy; }
    public void setEnergy(BigDecimal energy) { this.energy = energy; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
