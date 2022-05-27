import os

from pomodoro.base_settings import *

SECRET_KEY = os.environ["DJANGO_PROD_SECRET_KEY"]

ALLOWED_HOSTS = ['nochains.club', '192.168.231.220', 'localhost']

DEBUG = False
