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
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class BoxOffice {
  @Id
  @GeneratedValue
  private Long id;

  @Column(length = 20)
  private String imdbId;
  @Column(length = 100)
  private String budget;
  @Column(length = 100)
  private String openingWeekendUSA;
  @Column(length = 100)
  private String grossUSA;
  @Column(length = 100)
  private String cumulativeWorldwideGross;

  @JsonIgnore
  @ToString.Exclude
  @OneToOne(mappedBy = "boxOffice", fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
  private Movie movie;
}
