# Pomodoro Timer Web App

This project was mainly created to learn TailwindCSS and become more comfortable with
front end development using only HTML, CSS, and Javascript (No frameworks).

# Running

There is a Dockerfile and some one-line scripts in the `nginx/` folder that can be used to run
a local NGINX server for testing.

```
cd nginx/
./build.sh
./run.sh
```

The content should be available on http://localhost:8080/

If you are developing, it can be useful to use Tailwind's watch functionality to rebuild the stylesheet
when any changes are made to HTML or Javascript files. There is a script for that in the `nginx/` folder.

```
cd nginx/
./tailwind_watch.sh
```

# Deployment

There are many ways to deploy a static webpage like this, my preferred method is to put the whole
folder into an S3 bucket and then use CloudFormation to serve the content. A TLS certificate 
can be created with AWS Certificate Manager
