package com.enerlumea.api.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.enerlumea.api.model.Appliance;
import com.enerlumea.api.model.AppSetting;
import com.enerlumea.api.model.EnergyRecord;
import com.enerlumea.api.repository.ApplianceRepository;
import com.enerlumea.api.repository.AppSettingRepository;
import com.enerlumea.api.repository.EnergyRecordRepository;

@Configuration
public class DemoDataSeeder {
    @Bean
    ApplicationRunner seedDemoData(
            ApplianceRepository appliances,
            EnergyRecordRepository records,
            AppSettingRepository settings) {
        return args -> {
            if (settings.existsById("demo-data-seeded")) return;

            if (records.count() == 0) {
                records.saveAll(List.of(
                        record("Household Consumption", "Consumption", "2026-10-28", "12.5",
                                "Daily household electricity usage"),
                        record("Rooftop Solar", "Generation", "2026-10-28", "8.4",
                                "Estimated rooftop solar generation"),
                        record("Household Consumption", "Consumption", "2026-10-29", "14.2",
                                "Daily household electricity usage"),
                        record("Rooftop Solar", "Generation", "2026-10-29", "9.1",
                                "Estimated rooftop solar generation"),
                        record("Household Consumption", "Consumption", "2026-10-30", "11.8",
                                "Daily household electricity usage")));
            }

            if (appliances.count() == 0) {
                appliances.saveAll(List.of(
                        appliance("Air Conditioner", "Cooling", "1500", "6", "Active"),
                        appliance("Refrigerator", "Kitchen", "250", "24", "Active"),
                        appliance("Washing Machine", "Laundry", "500", "1", "Inactive"),
                        appliance("LED Lights", "Lighting", "100", "8", "Active"),
                        appliance("Television", "Entertainment", "120", "5", "Active")));
            }

            settings.save(new AppSetting("demo-data-seeded", "true"));
        };
    }

    private EnergyRecord record(String name, String type, String date, String energy, String notes) {
        EnergyRecord record = new EnergyRecord();
        record.setName(name);
        record.setType(type);
        record.setDate(LocalDate.parse(date));
        record.setEnergy(new BigDecimal(energy));
        record.setNotes(notes);
        return record;
    }

    private Appliance appliance(String name, String category, String power,
                                String hoursPerDay, String status) {
        Appliance appliance = new Appliance();
        appliance.setName(name);
        appliance.setCategory(category);
        appliance.setPower(new BigDecimal(power));
        appliance.setHoursPerDay(new BigDecimal(hoursPerDay));
        appliance.setStatus(status);
        return appliance;
    }
}
