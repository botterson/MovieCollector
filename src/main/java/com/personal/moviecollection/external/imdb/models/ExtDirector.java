package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Director;
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
public class ExtDirector implements Convertible<Director> {
  @NonNull
  private String id;
  private String title = "Director";
  @NonNull
  private String name;
  private String description;

  @Override
  public Director convert() {
    return Director.builder()
            .imdbId(id)
            .title(title)
            .name(name)
            .description(description)
            .build();
  }
}
