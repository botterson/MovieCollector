package com.personal.moviecollection.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Rating {
  @Id
  @GeneratedValue
  private Long id;

  @Column(length = 20)
  private String imdbId;
  @Column(nullable = false)
  private String title;
  @Column
  private String fullTitle;
  @Column(nullable = false, length = 100)
  private String type;
  @Column(nullable = false, length = 4)
  private String year;
  @Column(nullable = false, length = 4)
  private String imDbRating;
  @Column(length = 20)
  private String metaCriticRating;
  @Column(length = 20)
  private String theMovieDbRating;
  @Column(length = 20)
  private String rottenTomatoesRating;
  @Column(length = 20)
  private String tV_comRating;
  @Column(length = 20)
  private String filmAffinityRating;
  @Transient
  private String errorMessage;

  @JsonIgnore
  @ToString.Exclude
  @OneToOne(mappedBy = "ratings", cascade = CascadeType.ALL)
  private Movie movie;
}
