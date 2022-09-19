const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');



const spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
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
                        fs.appendFile(`music.txt`, music.replace(/ /g, '+'), (err) => {
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
    console.log('http://localhost:8081')
})