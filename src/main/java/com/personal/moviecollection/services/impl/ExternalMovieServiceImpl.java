package com.personal.moviecollection.services.impl;

import com.personal.moviecollection.constants.OtherSearchTypeEnum;
import com.personal.moviecollection.constants.SearchTypeEnum;
import com.personal.moviecollection.external.imdb.models.ExtMovie;
import com.personal.moviecollection.external.imdb.models.ExtPopularResult;
import com.personal.moviecollection.external.imdb.models.ExtSearchResult;
import com.personal.moviecollection.external.imdb.services.ExternalApiService;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.RankingSearchResult;
import com.personal.moviecollection.models.SearchResult;
import com.personal.moviecollection.services.ExternalMovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ExternalMovieServiceImpl implements ExternalMovieService {

  protected ExternalApiService service;

  public ExternalMovieServiceImpl(ExternalApiService service) {
    this.service = service;
  }

  @Override
  public Movie findDetailById(String id) {
    ExtMovie extMovie = service.findDetailById(id);
    log.debug("findDetailById: results = {}", extMovie);

    return extMovie.convert();
  }

  @Override
  public List<SearchResult> search(String name, SearchTypeEnum searchType) {
    List<ExtSearchResult> extResults = service.search(name, searchType);
    log.debug("search: results = {}", extResults);

    return extResults.stream()
            .map(ExtSearchResult::convert)
            .collect(Collectors.toList());
  }

  @Override
  public List<RankingSearchResult> rankingSearch(OtherSearchTypeEnum searchType) {
    List<ExtPopularResult> extResults = service.rankingSearch(searchType);
    log.debug("searchPopular: results = {}", extResults);

    return extResults.stream()
            .map(ExtPopularResult::convert)
            .collect(Collectors.toList());
  }
}
