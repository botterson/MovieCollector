package com.personal.moviecollection.services.impl;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.personal.moviecollection.exceptions.ItemAlreadyExistsException;
import com.personal.moviecollection.models.Format;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.QuickAddItem;
import com.personal.moviecollection.models.SearchResult;
import com.personal.moviecollection.models.UpdateFormatRequest;
import com.personal.moviecollection.repositories.FormatRepository;
import com.personal.moviecollection.repositories.MovieRepository;
import com.personal.moviecollection.services.ExternalMovieService;
import com.personal.moviecollection.services.PersonalMovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PersonalMovieServiceImpl implements PersonalMovieService {
  private ExternalMovieService externalSvc;
  private MovieRepository movieRepository;
  private FormatRepository formatRepository;

  private LoadingCache<Long, Format> formatCache =
          CacheBuilder.newBuilder()
                  .initialCapacity(4)
                  .maximumSize(10)                             // maximum 100 records can be cached
                  .expireAfterAccess(30, TimeUnit.MINUTES)      // cache will expire after 30 minutes of access
                  .build(new CacheLoader<Long, Format>() {  // build the cacheloader

                    @Override
                    public Format load(Long id) throws Exception {
                      //make the expensive call
                      return formatRepository.findById(id).get();

                    }
                  });

  public PersonalMovieServiceImpl(ExternalMovieService externalSvc, MovieRepository movieRepository, FormatRepository formatRepository) {
    this.externalSvc = externalSvc;
    this.movieRepository = movieRepository;
    this.formatRepository = formatRepository;
    loadCache();
  }

  private void loadCache() {
    formatRepository.findAll().stream()
            .forEach(format -> {
              try {
                formatCache.get(format.getId());
              } catch (ExecutionException e) {
                e.printStackTrace();
              }
            });
  }

  @Override
  public Movie findDetailById(final String id) {
    return movieRepository.findMovieByImdbId(id);
  }

  @Override
  public List<Movie> getMovieList() {
    List<Movie> unsortedList = movieRepository.findAll();
    List<Movie> list = unsortedList.stream().sorted(Comparator.comparing(Movie::getTitle)).collect(Collectors.toList());

    log.info("getMovieList: list={}", list);
    return list;
  }

  @Override
  public List<SearchResult> search(final String query) {

    return null;
  }

  @Override
  public List<Format> getAllFormats() {
    Map<Long, Format> sortedMap = new TreeMap<>(formatCache.asMap());

    log.info("getAllFormats: cache map={}", sortedMap);
    return sortedMap.values().stream().toList();
  }

  @Override
  public Movie addToCollection(QuickAddItem addItem) {
    log.info("addToCollection: addItem= {}", addItem);

    Movie foundMovie = movieRepository.findMovieByImdbId(addItem.getImdbId());
    if (foundMovie != null) {
      log.warn("Movie ({}) already exists.", foundMovie.getTitle());
      throw new ItemAlreadyExistsException("Movie (" + foundMovie.getTitle() + ") already exists.");
    }

    Movie movie = externalSvc.findDetailById(addItem.getImdbId());
    movie.setFormatList(convert(addItem.getFormats()));
    return upsertMovie(movie);
  }

  @Override
  public Movie upsertMovie(final Movie movie) {
//    log.info("Save Movie:  {}", movie);
    return movieRepository.save(movie);
  }

  @Override
  public Movie updateFormat(UpdateFormatRequest request) {
    Movie movie = movieRepository.findMovieByImdbId(request.getId());

    if (movie != null) {
      movie.setFormatList(convert(request.getFormats()));
      movie = movieRepository.save(movie);
    }
    return movie;
  }

  @Override
  public void deleteMovie(final String imdbId) {
    log.info("Delete Movie:  {}", imdbId);
    movieRepository.deleteByImdbId(imdbId);
  }

  private List<Format> convert(List<Long> idList) {
    return idList.stream()
            .map(id -> {
              try {
                return formatCache.get(id);
              } catch (ExecutionException e) {
                e.printStackTrace();
                return null;
              }
            })
            .collect(Collectors.toList());
  }

}
