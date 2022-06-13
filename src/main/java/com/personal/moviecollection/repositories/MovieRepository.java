package com.personal.moviecollection.repositories;

import com.personal.moviecollection.models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface MovieRepository extends JpaRepository<Movie, String> {
  Movie findMovieByImdbId(String imdbId);

  @Transactional
  void deleteByImdbId(String imdbId);
}
