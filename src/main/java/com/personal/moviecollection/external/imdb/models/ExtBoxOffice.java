package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.BoxOffice;
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
public class ExtBoxOffice implements Convertible<BoxOffice> {
  private String id;
  private String budget;
  private String openingWeekendUSA;
  private String grossUSA;
  private String cumulativeWorldwideGross;

  @Override
  public BoxOffice convert() {
    return BoxOffice.builder()
//            .imdbId(id)
            .budget(budget)
            .openingWeekendUSA(openingWeekendUSA)
            .grossUSA(grossUSA)
            .cumulativeWorldwideGross(cumulativeWorldwideGross)
            .build();
  }
}
