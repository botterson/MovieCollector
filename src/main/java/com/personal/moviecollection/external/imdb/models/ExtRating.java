package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Rating;
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
public class ExtRating implements Convertible<Rating> {
  @NonNull
  private String id;
  private String title;
  private String fullTitle;
  private String type;
  private String year;
  private String imDbRating;
  private String metaCriticRating;
  private String theMovieDbRating;
  private String rottenTomatoesRating;
  private String tV_comRating;
  private String filmAffinityRating;
  private String errorMessage;

  @Override
  public Rating convert() {
    return Rating.builder()
            .imdbId(id)
            .title(title)
            .fullTitle(fullTitle)
            .type(type)
            .year(year)
            .imDbRating(imDbRating)
            .metaCriticRating(metaCriticRating)
            .theMovieDbRating(theMovieDbRating)
            .rottenTomatoesRating(rottenTomatoesRating)
            .tV_comRating(tV_comRating)
            .filmAffinityRating(filmAffinityRating)
            .errorMessage(errorMessage)
            .build();
  }
}
