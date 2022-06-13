package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Genre;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtGenre implements Convertible<Genre> {
  @NonNull
  private Long id;

//  @NonNull
//  private String key;

  @NonNull
  private String value;

  @Override
  public Genre convert() {
    return Genre.builder()
            .id(id)
            .value(value)
            .build();
  }
}
