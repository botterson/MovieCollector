package com.personal.moviecollection.contollers.handlers;

import com.personal.moviecollection.exceptions.ExceededMaxUsageException;
import com.personal.moviecollection.exceptions.ItemAlreadyExistsException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = { ItemAlreadyExistsException.class })
  protected ResponseEntity<Object> handleEntityNotFound(RuntimeException ex) {
    ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
    apiError.setMessage(ex.getMessage());
    return buildResponseEntity(apiError);
  }

  @ExceptionHandler(value = { ExceededMaxUsageException.class })
  protected ResponseEntity<Object> handleEntityExceededMaxUsage(RuntimeException ex) {
    ApiError apiError = new ApiError(HttpStatus.TOO_MANY_REQUESTS);
    apiError.setMessage(ex.getMessage());
    return buildResponseEntity(apiError);
  }

  private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
    return new ResponseEntity<>(apiError, apiError.getStatus());
  }
}
