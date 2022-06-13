package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.RankingSearchResult;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtPopularResult implements Convertible<RankingSearchResult> {
  private String id;
  private String image;
  private String title;
  private String rank;
  private String rankUpDown;
  private String fullTitle;
  private String year;
  private String crew;
  private String imDbRating;
  private String imDbRatingCount;

  @Override
  public RankingSearchResult convert() {
    return RankingSearchResult.builder()
            .id(id)
            .image(image)
            .title(title)
            .rank(rank)
            .rankUpDown(rankUpDown)
            .fullTitle(fullTitle)
            .year(year)
            .crew(crew)
            .imDbRating(imDbRating)
            .imDbRatingCount(imDbRatingCount)
            .build();
  }
}
