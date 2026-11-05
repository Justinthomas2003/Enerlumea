package com.enerlumea.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.enerlumea.api.repository.ApplianceRepository;
import com.enerlumea.api.repository.AppSettingRepository;
import com.enerlumea.api.repository.ContactMessageRepository;
import com.enerlumea.api.repository.EnergyRecordRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ApiIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ApplianceRepository appliances;

    @Autowired
    private EnergyRecordRepository records;

    @Autowired
    private ContactMessageRepository messages;

    @Autowired
    private AppSettingRepository settings;

    @BeforeEach
    void clearDatabase() {
        records.deleteAll();
        appliances.deleteAll();
        messages.deleteAll();
        settings.deleteAll();
    }

    @Test
    void supportsEnergyRecordCreateReadUpdateAndDelete() throws Exception {
        String body = """
                {"name":"Daily usage","type":"Consumption","date":"2026-11-01","energy":12.75,"notes":"Test record"}
                """;

        mvc.perform(post("/api/energy-records")
                        .contentType("application/json")
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber());

        Long id = records.findAll().getFirst().getId();
        mvc.perform(get("/api/energy-records"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].energy").value(12.75));

        mvc.perform(put("/api/energy-records/{id}", id)
                        .contentType("application/json")
                        .content(body.replace("12.75", "13.25")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.energy").value(13.25));

        mvc.perform(delete("/api/energy-records/{id}", id))
                .andExpect(status().isNoContent());
        mvc.perform(get("/api/energy-records"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void validatesAppliancesAndPersistsValidEntries() throws Exception {
        mvc.perform(post("/api/appliances")
                        .contentType("application/json")
                        .content("""
                                {"name":"","category":"Cooling","power":0,"hoursPerDay":25,"status":"Broken"}
                                """))
                .andExpect(status().isBadRequest());

        mvc.perform(post("/api/appliances")
                        .contentType("application/json")
                        .content("""
                                {"name":"Air conditioner","category":"Cooling","power":1500,"hoursPerDay":6,"status":"Active"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Air conditioner"));

        mvc.perform(get("/api/appliances"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].hoursPerDay").value(6));
    }

    @Test
    void acceptsValidContactMessagesAndRejectsInvalidEmails() throws Exception {
        mvc.perform(post("/api/contact-messages")
                        .contentType("application/json")
                        .content("""
                                {"name":"Ada Lovelace","email":"ada@example.com","subject":"Energy question","message":"Please tell me more about solar estimates."}
                                """))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.submittedAt").isNotEmpty());

        mvc.perform(post("/api/contact-messages")
                        .contentType("application/json")
                        .content("""
                                {"name":"Ada Lovelace","email":"not-an-email","subject":"Energy question","message":"Please tell me more about solar estimates."}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void allowsTheConfiguredViteOriginToCallTheApi() throws Exception {
        mvc.perform(options("/api/appliances")
                        .header("Origin", "http://localhost:5173")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string(
                        "Access-Control-Allow-Origin",
                        "http://localhost:5173"));
    }
}
