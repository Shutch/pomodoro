import os

env = os.environ.get("DJANGO_ENV")

if env == 'development' or env is None:
    from pomodoro.dev_settings import *
elif env == 'production':
    from pomodoro.prod_settings import *
else:
    raise ValueError(f"DJANGO_ENV environmental variable value not recognized: {env}")
