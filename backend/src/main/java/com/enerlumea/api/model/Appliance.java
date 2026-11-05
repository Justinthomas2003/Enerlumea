package com.enerlumea.api.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "appliances")
public class Appliance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false, length = 120)
    private String name;

    @NotBlank
    @Size(max = 60)
    @Column(nullable = false, length = 60)
    private String category;

    @NotNull
    @DecimalMin("0.01")
    @Column(nullable = false, precision = 12, scale = 3)
    private BigDecimal power;

    @NotNull
    @DecimalMin("0.01")
    @DecimalMax("24")
    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal hoursPerDay;

    @NotBlank
    @Pattern(regexp = "Active|Inactive")
    @Column(nullable = false, length = 20)
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public BigDecimal getPower() { return power; }
    public void setPower(BigDecimal power) { this.power = power; }
    public BigDecimal getHoursPerDay() { return hoursPerDay; }
    public void setHoursPerDay(BigDecimal hoursPerDay) { this.hoursPerDay = hoursPerDay; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
