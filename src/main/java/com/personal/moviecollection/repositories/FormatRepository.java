package com.personal.moviecollection.repositories;

import com.personal.moviecollection.models.Format;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormatRepository extends JpaRepository<Format, Long> {
  Format findByValue(String value);
}
