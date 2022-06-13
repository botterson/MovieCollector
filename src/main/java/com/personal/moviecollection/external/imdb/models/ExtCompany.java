package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Company;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtCompany implements Convertible<Company> {
  @NonNull
  private String id;
  @NonNull
  private String name;

  @Override
  public Company convert() {
    return Company.builder()
            .imdbId(id)
            .name(name)
            .build();
  }
}
