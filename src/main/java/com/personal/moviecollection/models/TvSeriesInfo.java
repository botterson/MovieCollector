package com.personal.moviecollection.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class TvSeriesInfo {
  @Id
  @GeneratedValue
  private Long id;

  @Column(length = 4)
  private String yearEnd;

  @Column
  private String creators;

  @OneToMany(mappedBy = "tvSeriesInfo", cascade = CascadeType.ALL)
  private List<Creator> creatorList;

  @OneToMany(mappedBy = "tvSeriesInfo", cascade = CascadeType.ALL)
  private List<Season> seasons;

  @JsonIgnore
  @ToString.Exclude
  @OneToOne(mappedBy = "tvSeriesInfo")
  private Movie movie;
}
