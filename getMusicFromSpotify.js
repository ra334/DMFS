const express = require('express');
const app = express();
const router = express.Router()
const FM = require('./fileManipulations')
const SpotifyWebApi = require('spotify-web-api-node');
const fm = new FM();


const spotifyApi = new SpotifyWebApi({
    clientId: '59f0a72507574fb6854ec229791be2db',
    clientSecret: '50c1de00ceef4255a6e94a7f8f8e7c83',
    redirectUri: 'http://localhost:8081/callback'
});

router.get('/', (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL([
        'ugc-image-upload',
        'user-modify-playback-state',
        'user-follow-modify',
        'user-read-recently-played',
        'user-read-playback-position',
        'playlist-read-collaborative',
        'app-remote-control',
        'user-read-playback-state',
        'user-read-email',
        'user-top-read',
        'playlist-modify-public',
        'user-library-modify',
        'user-follow-read',
        'user-read-currently-playing',
        'user-library-read',
        'playlist-read-private',
        'user-read-private',
        'playlist-modify-private',
        'streaming'
    ]))
})

async function getPlayListMusics(id) {
    let musicArr = []
    await spotifyApi.getPlaylist(id)
        .then(data => {
            const myArr = data.body.tracks.items
            for (i of myArr) {
                for (artist of i.track.artists) {
                    musicArr.push([artist.name, i.track.name])
                }
            }

        })
    return musicArr
}

router.get('/callback', (req, res, next) => {
    spotifyApi.authorizationCodeGrant(req.query.code)
        .then(response => {
            res.send(JSON.stringify(response))
            spotifyApi.setAccessToken(response.body.access_token)
            getPlayListMusics('3wKIZ3I7S5QWrpXsEVaKTc')
                .then(data => {
                    for ([i, b] of data) {
                        let music = `${i} - ${b}\n`
                        fs.appendFile(`music.txt`, music, (err) => {
                            if (err) throw err;
                        })

                        console.log('ok')
                    }
                })

        })
})


app.use('/', router)
app.listen(8081, () => {
    console.log('App start')
})