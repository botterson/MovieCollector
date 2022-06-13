package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Creator;
import com.personal.moviecollection.models.Season;
import com.personal.moviecollection.models.TvSeriesInfo;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtTvSeriesInfo implements Convertible<TvSeriesInfo> {
  private Long id;

  private String yearEnd;
  private String creators;
  private List<ExtCreator> creatorList;
  private List<String> seasons;

  @Override
  public TvSeriesInfo convert() {
    return TvSeriesInfo.builder()
            .id(id)
            .yearEnd(yearEnd)
            .creators(creators)
            .creatorList(convert(creatorList))
            .seasons(
                    seasons.stream()
                            .map(item -> Season.builder().season(item).build())
                            .collect(Collectors.toList())
            )
            .build();
  }
}
