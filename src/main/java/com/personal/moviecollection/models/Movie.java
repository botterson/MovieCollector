package com.personal.moviecollection.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.Singular;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Movie {
  @Id
  @GeneratedValue
  private Long id;

  @NonNull
  @Column(nullable = false, length = 20, unique=true)
  private String imdbId;
  @NonNull
  @Column(nullable = false)
  private String title;
  @Column
  private String originalTitle;
  @Column
  private String fullTitle;
  @Column(nullable = false, length = 100)
  private String type;
  @Column(length = 4)
  private String year;
  @Column
  private String image;
  @Column(length = 10)
  private String releaseDate;
  @Column(length = 5)
  private String runtimeMins;
  @Column(length = 10)
  private String runtimeStr;
  @Column(length = 1000)
  private String plot;
  @Singular("formatList")
  @ManyToMany(cascade=CascadeType.MERGE)
  private List<Format> formatList;
  @Column
  private String awards;
  @Singular("directorList")
  @ManyToMany(cascade=CascadeType.ALL)
  private List<Director> directorList;
  @Singular("writerList")
  @ManyToMany(cascade=CascadeType.ALL)
  private List<Writer> writerList;
  @Singular("actorList")
  @ManyToMany(cascade=CascadeType.ALL)
  private List<Actor> actorList;
  @Singular("genreList")
  @ManyToMany(cascade=CascadeType.ALL)
  private List<Genre> genreList;
  @Singular("companyList")
  @ManyToMany(cascade=CascadeType.ALL)
  private List<Company> companyList;
  @Column
  private String languages;
  @Column(length = 100)
  private String contentRating;
  @Column
  private String imDbRating;
  @Column
  private String imDbRatingVotes;
  @Column
  private String metacriticRating;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "rating_id", referencedColumnName = "id")
  private Rating ratings;
  @Column
  private String posters;
  @Column
  private String images;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "boxOffice_id")
  private BoxOffice boxOffice;
  @Column
  private String keywords;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "tvSeriesInfo_id", referencedColumnName = "id")
  private TvSeriesInfo tvSeriesInfo;
  @Transient
  private String errorMessage;
}
