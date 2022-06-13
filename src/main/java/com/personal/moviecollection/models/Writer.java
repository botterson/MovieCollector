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
import javax.persistence.ManyToMany;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Writer {
  @Id
  @GeneratedValue
  private Long id;

  @Column(length = 20)
  private String imdbId;

  @Builder.Default
  private String title = "Writer";

  @NonNull
  @Column(nullable = false)
  private String name;

  @Column(length = 1000)
  private String description;

  @JsonIgnore
  @ToString.Exclude
  @ManyToMany(mappedBy = "writerList", cascade = CascadeType.ALL)
  private List<Movie> movieList;
}
