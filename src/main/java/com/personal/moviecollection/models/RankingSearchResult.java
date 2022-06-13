package com.personal.moviecollection.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class RankingSearchResult {
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
}
