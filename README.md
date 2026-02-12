# fun-with-country-flags.github.io
Simple vibe-coded website to determine your favorite flag, all from my iPhone. 

The idea for this app came from a small discussion on Christmas eve, about what ones favorite flag is. 

Challenge of this tiny project was to figure out how to fully 'build' and deploy this app from my iphone.

The app was built with following steps:
- Ask ChatGPT to generate a single html file for a knock-out tournament to determine the coolest flag according to your taste. I specifically asked to use emoji-flags as this makes it possible to run the app without loading flag images from external sources. 
- Copy html file and paste into Apple files.
- Test the app locally by opening it with Edge. Somehow, opening with safari is not offered as a possibility. 
- Change the extension from .txt to .html. (This was by far the 'hardest' part of the whole process, as you need to find and enable the setting to show file extensions in the file name. 😑)
- Deploy the app on github pages. Use the mobile website for this, not the github app as that does not habe all needed functionality.

All in all, this was a funny little project to see what simple app you can build with AI in 10 minutes from your phone.

## Setting up backend for global flag leaderboard

This site collects every winning flag, and keeps track of most popular flags in a global leaderboard. The backend is setup with Cloudflare Workers + D1.

### Create a new workers project

```
wrangler init flag-tournament-api
```

Choose Hello World, worker only.

### Setup D1 database

```
wrangler d1 create flag-votes-db
```

Copy output to the `wrangler.jsonc` file.

### Run DB migration file

```
cd flag-tournament-api
wrangler d1 execute flag-votes-db --file=./schema.sql
```
