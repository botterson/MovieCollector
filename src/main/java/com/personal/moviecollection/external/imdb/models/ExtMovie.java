package com.personal.moviecollection.external.imdb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.personal.moviecollection.models.Movie;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Column;
import java.util.List;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExtMovie implements Convertible<Movie> {
  @NonNull
  private String id;
  @NonNull
  private String title;
  private String originalTitle;
  private String fullTitle;
  private String type;
  private String year;
  private String image;
  private String releaseDate;
  private String runtimeMins;
  private String runtimeStr;
  private String plot;
  private String awards;
  private List<ExtDirector> directorList;
  private List<ExtWriter> writerList;
  private List<ExtActor> actorList;
  private List<ExtGenre> genreList;
  private List<ExtCompany> companyList;
  private String languages;
  private String contentRating;
  private String imDbRating;
  private String imDbRatingVotes;
  private String metacriticRating;
  private ExtRating ratings;
  private String posters;
  private String images;
  private ExtBoxOffice boxOffice;
  private String keywords;
  private ExtTvSeriesInfo tvSeriesInfo;
  private String errorMessage;

  @Override
  public Movie convert() {
    return Movie.builder()
            .imdbId(id)
            .title(title)
            .originalTitle(originalTitle)
            .fullTitle(fullTitle)
            .type(type)
            .year(year)
            .image(image)
            .releaseDate(releaseDate)
            .runtimeMins(runtimeMins)
            .runtimeStr(runtimeStr)
            .plot(plot)
            .awards(awards)
            .directorList(convert(directorList))
            .writerList(convert(writerList))
            .actorList(convert(actorList))
            .genreList(convert(genreList))
            .companyList(convert(companyList))
            .languages(languages)
            .contentRating(contentRating)
            .imDbRating(imDbRating)
            .imDbRatingVotes(imDbRatingVotes)
            .metacriticRating(metacriticRating)
            .ratings(ratings != null ? ratings.convert() : null)
            .posters(posters)
            .images(images)
            .boxOffice(boxOffice != null ? boxOffice.convert() : null)
            .keywords(keywords)
            .tvSeriesInfo(tvSeriesInfo != null ? tvSeriesInfo.convert() : null)
            .errorMessage(errorMessage)
            .build();
  }
}
