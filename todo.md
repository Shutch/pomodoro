## Before deploy
[X] Add tailwind_css tag to base html (#9 at https://django-tailwind.readthedocs.io/en/latest/installation.html)
[X] Basic button layout
[X] Timer countdown
[X] Settings to change timer amounts
[X] cookie to remember settings
[X] Play sound when timer is done
[X] Fix button latching CSS for timer type selection
[X] Update title with time
[X] Fix bug where timer sound plays when 00:00
[X] Work on edge case for start/stop/reset around 00:00 and initialization at 00:00
[X] Fix missing favicon
[X] Fix hitting start multiple times counts the timer down quickly bug
[X] Fix timer font shifting as time counts down
[X] Keyboard shortcuts for settings
[X] Switch from cookies to local storage

## Deploy
[X] change /timer to / (root)
[X] Create production and dev settings files, run them based on ENVVAR
[X] Create docker-compose for dev with mounted volume
[ ] Create docker-compose for prod with server
[ ] Package for deployment
[ ] Deploy on local network for testing
[ ] Pick hosting platform (render.com, fly.io, heroku, aws, digitalocean)
[ ] Deploy on hosting platform

## After deploy
[ ] record timers in database
