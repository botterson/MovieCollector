package com.personal.moviecollection.contollers;

import com.personal.moviecollection.constants.OtherSearchTypeEnum;
import com.personal.moviecollection.constants.SearchTypeEnum;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.RankingSearchResult;
import com.personal.moviecollection.models.SearchResult;
import com.personal.moviecollection.services.ExternalMovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("${api.v1}/external")
public class ExternalMovieController {

  protected ExternalMovieService service;

  public ExternalMovieController(ExternalMovieService service) {
    this.service = service;
  }

  @CrossOrigin
  @GetMapping("/all/detail/{id}")
  public Movie findById(@PathVariable String id) {
    log.debug("findDetailById: {}", id);
    return service.findDetailById(id);
  }

  /**
   * Search for both Movies and Series.
   * @param title name of show.
   * @return list of brief search results.
   */
  @CrossOrigin
  @GetMapping("/search/title/{title}")
  public List<SearchResult> findByTitle(@PathVariable String title) {
    log.debug("findByTitle: {}", title);
    return service.search(title, SearchTypeEnum.Title);
  }

  /**
   * Search for Movies by title
   * @param title title of movie
   * @return List of brief movie search results
   */
  @CrossOrigin
  @GetMapping("/search/movies/{title}")
  public List<SearchResult> findMoviesByTitle(@PathVariable String title) {
    log.debug("findMovieByTitle: {}", title);
    return service.search(title, SearchTypeEnum.Movie);
  }

  /**
   * Search for Series by title
   * @param title title of series
   * @return List of brief series search results
   */
  @CrossOrigin
  @GetMapping("/search/series/{title}")
  public List<SearchResult> findSeriesByTitle(@PathVariable String title) {
    log.debug("findMovieByTitle: {}", title);
    return service.search(title, SearchTypeEnum.Series);
  }

  @CrossOrigin
  @GetMapping("/movies/topMovies")
  public List<RankingSearchResult> findTopMovies() {
    return service.rankingSearch(OtherSearchTypeEnum.Top250Movies);
  }

  @CrossOrigin
  @GetMapping("/series/topSeries")
  public List<RankingSearchResult> findTopTVs() {
    return service.rankingSearch(OtherSearchTypeEnum.Top250TVs);
  }

  @CrossOrigin
  @GetMapping("movies/popularMovies")
  public List<RankingSearchResult> findPopularMovies() {
    return service.rankingSearch(OtherSearchTypeEnum.MostPopularMovies);
  }

  @CrossOrigin
  @GetMapping("/series/popularSeries")
  public List<RankingSearchResult> findPopularTVs() {
    return service.rankingSearch(OtherSearchTypeEnum.MostPopularTVs);
  }
}
