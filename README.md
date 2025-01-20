# Movie API - Documentation

## Resources

- App Base Url

  - https://movieapp-api-lms1.onrender.com

- Admin User
  - email: "admin@mail.com"
  - password: "admin123"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

  ```json
  {
    "email": "sample@mail.com",
    "password": "samplePw123"
  }
  ```

#### [POST] - "/users/register"

- Sample Request Body

  ```json
  {
    "email": "sample@mail.com",
    "password": "samplePw123"
  }
  ```

### Movies

#### [POST] - "/movies/addMovie"

- Sample Request Body

  ```json
  {
    "title": "Sample: The Movie",
    "director": "Sample L. Jackson",
    "year": 2024,
    "description": "sample description",
    "genre": "sample"
  }
  ```

#### [GET] - "/movies/getMovies"

- No Request Body

#### [GET] - "/movies/getMovie/:id"

- No Request Body

#### [PATCH] - "/movies/updateMovie/:id"

- Sample Request Body

  ```json
  {
    "title": "Sample 2: The Update",
    "director": "Sample L. Jackson",
    "year": 2026,
    "description": "sample updated description",
    "genre": "sample"
  }
  ```

#### [DELETE] - "/movies/deleteMovie/:id"

- No Request Body

#### [POST] - "/movies/addComment/:id"

- Sample Request Body

  ```json
  {
    "comment": "Sample 2: The Reckoning is the best sample update of all time."
  }
  ```

#### [GET] - "/movies/getComments/:id"

- No Request Body
