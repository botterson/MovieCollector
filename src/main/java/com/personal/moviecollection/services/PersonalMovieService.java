package com.personal.moviecollection.services;

import com.personal.moviecollection.models.Format;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.QuickAddItem;
import com.personal.moviecollection.models.SearchResult;
import com.personal.moviecollection.models.UpdateFormatRequest;

import java.util.List;

public interface PersonalMovieService {

  Movie findDetailById(final String id);

  List<Movie> getMovieList();

  List<SearchResult> search(final String query);

  Movie addToCollection(QuickAddItem item);

  Movie upsertMovie(final Movie movie);

  void deleteMovie(final String imdbId);

  Movie updateFormat(UpdateFormatRequest request);

  List<Format> getAllFormats();
}
