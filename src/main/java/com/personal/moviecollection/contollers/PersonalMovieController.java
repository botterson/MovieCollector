package com.personal.moviecollection.contollers;

import com.personal.moviecollection.models.Format;
import com.personal.moviecollection.models.Movie;
import com.personal.moviecollection.models.QuickAddItem;
import com.personal.moviecollection.models.SearchResult;
import com.personal.moviecollection.models.UpdateFormatRequest;
import com.personal.moviecollection.services.PersonalMovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("${api.v1}/personal")
public class PersonalMovieController {

  protected PersonalMovieService service;

  public PersonalMovieController(PersonalMovieService service) {
    this.service = service;
  }

  @GetMapping("/search/{query}")
  public List<SearchResult> search(@PathVariable String query) {
    return service.search(query);
  }

  @GetMapping("/all/formats")
  public List<Format> getAllFormats() {return service.getAllFormats();}

  @GetMapping("/all")
  public List<Movie> getMovieList() {
    return service.getMovieList();
  }

  @GetMapping("/movie/{id}")
  public Movie findById(@PathVariable String id) {
    log.debug("findDetailById: {}", id);
    return service.findDetailById(id);
  }

  @CrossOrigin
  @PostMapping("/movie")
  public Movie upsertMovie(@RequestBody Movie movie) {
    return service.upsertMovie(movie);
  }

  @CrossOrigin
  @PostMapping("/movie/addToCollection")
  public Movie addToCollection(@RequestBody QuickAddItem item) {
    return service.addToCollection(item);
  }

  @CrossOrigin
  @PostMapping("/movie/updateFormat")
  public Movie updateFormat(@RequestBody UpdateFormatRequest request) {
    return service.updateFormat(request);
  }

  @CrossOrigin
  @DeleteMapping("/movie/{id}")
  public void deleteMovie(@PathVariable String id) {
    service.deleteMovie(id);
  }
}
