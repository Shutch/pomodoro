# Pomodoro Timer Web App

This project was mainly created to learn Django and become more comfortable with
front end development using only HTML, CSS, and Javascript (No frameworks).

# Running
The project can be spun up from the command line using either the development or
production docker compose files.

```
docker compose -f docker-compose-dev.yml up
```

or  

```
docker compose -f docker-compose-prod.yml up
```

When running prod, a `.env` file should be in the same base folder as the
docker compose file that contains a secret key that meets Django's minimum requirements.

The `.env` file should look something like this:
```
DJANGO_PROD_SECRET_KEY=at_least_50_character_long_key_here
```
