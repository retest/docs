Welcome to the recheck-web dev wiki!

# How to build and deploy the project locally 

To trigger a deployment via Travis CI, you have to skip JAR signing locally:
```
mvn release:prepare -Darguments="-Dgpg.skip=true"
```

# How to create/update the readme video/GIF

 * Create a video e.g. using Eclipse and QuickTime
 * Edit the video (shorten) using iMovie
 * Convert the video using GIF Brewery 3
 * Click "Create a new issue" and insert the video (but do not actually create the issue)
 * Insert the given URL into the readme
