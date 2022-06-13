package com.personal.moviecollection.external.imdb.services.impl;

import com.personal.moviecollection.constants.OtherSearchTypeEnum;
import com.personal.moviecollection.constants.SearchTypeEnum;
import com.personal.moviecollection.exceptions.ExceededMaxUsageException;
import com.personal.moviecollection.external.imdb.models.ExtMovie;
import com.personal.moviecollection.external.imdb.models.ExtOthersResponse;
import com.personal.moviecollection.external.imdb.models.ExtPopularResult;
import com.personal.moviecollection.external.imdb.models.ExtSearchResponse;
import com.personal.moviecollection.external.imdb.models.ExtSearchResult;
import com.personal.moviecollection.external.imdb.services.ExternalApiService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service("ImdbApi")
@Qualifier("ImdbApi")
public class ImdbApiServiceImpl implements ExternalApiService {

  @Value("${imdb-api.base-url}")
  private String baseUrl;
  @Value("${imdb-api-key}")
  private String apiKey;

  private RestTemplate template;

  public ImdbApiServiceImpl(RestTemplate template) {
    this.template = template;
  }

  @Override
  public ExtMovie findDetailById(String id) {
    if (StringUtils.isBlank(id)) {
      throw new NullPointerException("Id is Required!");
    }

    final String url = baseUrl + "/Title/"+ apiKey + "/" + id;
    log.info("findDetailById:  url={}", url);

    ResponseEntity<ExtMovie> results = template.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {});

    log.debug("findDetailById: results={}", results);

    if (results.getStatusCode() == HttpStatus.OK) {
      if (StringUtils.isNotBlank(results.getBody().getErrorMessage())) {
        throw new ExceededMaxUsageException(results.getBody().getErrorMessage());
      }

      return results.getBody();
    }

    log.error("ERROR: Bad Status Code={}", results.getStatusCodeValue());
    throw new RuntimeException("Bad Status Code: " + results.getStatusCodeValue());
  }

  @Override
  public List<ExtSearchResult> search(String title, SearchTypeEnum searchType) {
    String url;
    switch (searchType) {
      case Movie -> url = (baseUrl + "/SearchMovie/" + apiKey + "/" + title);
      case Series -> url = (baseUrl + "/SearchSeries/" + apiKey + "/" + title);
      case Title -> url = (baseUrl + "/SearchTitle/" + apiKey + "/" + title);
      default -> throw new RuntimeException("ERROR:  Unknown search type=" + searchType);
    }

    log.info("search: url={}", url);
    ResponseEntity<ExtSearchResponse<ExtSearchResult>> results = template.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {});

    log.debug("search: results={}", results);

    if (results.getStatusCode() == HttpStatus.OK) {
      if (StringUtils.isNotBlank(results.getBody().getErrorMessage())) {
        throw new ExceededMaxUsageException(results.getBody().getErrorMessage());
      }

      return results.getBody().getResults();
    }

    log.error("ERROR: Bad Status Code={}", results.getStatusCodeValue());
    throw new RuntimeException("Bad Status Code: " + results.getStatusCodeValue());
  }

  @Override
  public List<ExtPopularResult> rankingSearch(OtherSearchTypeEnum searchType) {
    String url;
    switch (searchType) {
      case Top250Movies -> url = (baseUrl + "/Top250Movies/" + apiKey);
      case Top250TVs -> url = (baseUrl + "/Top250TVs/" + apiKey);
      case MostPopularMovies -> url = (baseUrl + "/MostPopularMovies/" + apiKey);
      case MostPopularTVs -> url = (baseUrl + "/MostPopularTVs/" + apiKey);
      default -> throw new RuntimeException("ERROR:  Unknown search type=" + searchType);
    }

    log.info("searchPopular: url={}", url);
    ResponseEntity<ExtOthersResponse<ExtPopularResult>> results = template.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {});

//    log.debug("searchPopular: results={}", results);

    if (results.getStatusCode() == HttpStatus.OK) {
      if (StringUtils.isNotBlank(results.getBody().getErrorMessage())) {
        throw new ExceededMaxUsageException(results.getBody().getErrorMessage());
      }

      return results.getBody().getItems();
    }

    log.error("ERROR: Bad Status Code={}", results.getStatusCodeValue());
    throw new RuntimeException("Bad Status Code: " + results.getStatusCodeValue());
  }
}
