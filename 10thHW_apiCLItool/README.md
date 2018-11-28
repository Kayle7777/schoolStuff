# LIRI Node App

A node command line app to demonstrate multiple different API calls.

****

**Installation Instructions**

1. Get neccessary files / dependencies

        Git clone this repository.
        Navigate to liri-node-app/bin, and type npm install in the terminal, to install the dependencies in package.json

2. Add your API keys

        Create a file called .env in the parent directory of this repository.

In that file, add the following text, replacing the values with your own keys

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

# OMDB key

OMDB_KEY=your-key
```

****

**Usage**

    * `node liri.js my-tweets`

    * `node liri.js spotify-this-song "song"`

    * `node liri.js movie-this "movie"`

    * `node liri.js do-what-it-says` <= This is controlled by the text inside random.txt

****

## Authors

* **Jesse Webb** - *All JavaScript* - [Kayle7777](https://github.com/kayle7777)

****

## Notable Concepts / Technologies Used

* *API authorization using URI tokens, localStorage handler*

* *Async / Await functions*

* *Node dev environment*

* *fs*

* *twitter API*

* *spotify API*

* *fetch*

****

## Links

* **Code repository** - hosted on [Github][github Repo]

[github Repo]: https://github.com/Kayle7777/liri-node-app
