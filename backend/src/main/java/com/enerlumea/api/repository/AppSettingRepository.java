package com.enerlumea.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enerlumea.api.model.AppSetting;

public interface AppSettingRepository extends JpaRepository<AppSetting, String> {
}
