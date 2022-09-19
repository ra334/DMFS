const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const arr = fs.readFileSync('music_link.txt').toString().split('\n');

async function converter(music_link) {

    let stream = ytdl(music_link, {
        quality: 'highestaudio',
    });

    let start = Date.now();
    await ffmpeg(stream)
        .audioBitrate(128)
        .save(`${__dirname}/${music_link.replaceAll('+', ' ')}.mp3`)
        .on('progress', p => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
            console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        });
}


async function start() {
    for (let i of arr) {
        await converter(i)
        console.log(i)
    }
}

start()