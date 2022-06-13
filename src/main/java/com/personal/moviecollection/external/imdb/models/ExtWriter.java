package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Writer;
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
public class ExtWriter implements Convertible<Writer> {
  @NonNull
  private String id;
  private String title = "Writer";
  @NonNull
  private String name;
  private String description;

  @Override
  public Writer convert() {
    return Writer.builder()
            .imdbId(id)
            .title(title)
            .name(name)
            .description(description)
            .build();
  }
}
