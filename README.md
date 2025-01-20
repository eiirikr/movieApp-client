# Fitness App API - Documentation

## Resources

- App Base Url

  - https://fitnessapi-javier.onrender.com

- Admin User
  - No Admin

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

#### [GET] - "/users/details"

- Requires token
- No Request Body

### Workouts

#### [POST] - "/workouts/addWorkout"

- Sample Request Body

  ```json
  {
    "name": "Sample Workout",
    "duration": "30 mins"
  }
  ```

#### [GET] - "/workouts/getMyWorkouts"

- No Request Body

#### [PATCH] - "/workouts/updateWorkout/:id"

- Sample Request Body

  ```json
  {
    "name": "Sample Workout",
    "duration": "30 mins"
  }
  ```

#### [DELETE] - "/workouts/deleteMovie/:id"

- No Request Body

#### [POST] - "/workouts/completeWorkoutStatus/:id"

- No Request Body
