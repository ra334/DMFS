const fs = require('fs');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


// fs.readFile(`music.txt`, (err, data) => {
//     if (err) throw err;
//     for (let i of data.toString().split('\n')) {
//         console.log(`https://www.youtube.com/results?search_query=${i}`)
//         axios.get(`https://www.youtube.com/results?search_query=${i}`)
//             .then((res) => {
//                 let currentPage = res.data;
//                 const dom = new JSDOM(currentPage);

//                 let videoLink = dom.window.document.querySelector('a.ytd-video-renderer').href;
//                 fs.appendFile('music_link.txt', videoLink, (err) => {
//                     if (err) throw err;
//                 })

//             })
//     }
// })

axios.get(`https://www.youtube.com/results?search_query=Rebel+Scum+-+Back+Up`)
    .then((res) => {
        let currentPage = res.data;
        const dom = new JSDOM(currentPage);

        let videoLink = dom.window.document.getElementById('video-title').href
        console.log(videoLink)
        fs.appendFile('music_link.txt', JSON.stringify(videoLink), (err) => {
            if (err) throw err;
        })

    })