package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.SearchResult;
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
public class ExtSearchResult implements Convertible<SearchResult> {
  private String id;
  private String image;
  private String title;
  private String resultType;
  private String description;

  @Override
  public SearchResult convert() {
    return SearchResult.builder()
            .id(id)
            .image(image)
            .title(title)
            .resultType(resultType)
            .description(description)
            .build();
  }
}
