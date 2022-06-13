package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Actor;
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
public class ExtActor implements Convertible<Actor> {
  @NonNull
  private String id;
  @NonNull
  private String name;
  private String image;
  private String asCharacter;

  @Override
  public Actor convert() {
    return Actor.builder()
            .imdbId(id)
            .name(name)
            .image(image)
            .asCharacter(asCharacter)
            .build();
  }
}
