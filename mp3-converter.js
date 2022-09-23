const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const music_arr = fs.readFileSync('music_link.txt').toString().split('\n');
let count = 0


async function converter(music_link, music_name) {

    let stream = ytdl(music_link, {
        quality: 'highestaudio',
    });

    let start = Date.now();
    console.log(music_link, music_name)
    await ffmpeg(stream)
        .audioBitrate(128)
        .save(`${__dirname}/${music_name}.mp3`)
        .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
            console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        });
}


async function start() {
    for (let i of music_arr) {
        count += 1
        console.log(typeof i)
        await converter(i, count)
    }
}

start()