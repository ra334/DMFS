const puppeteer = require('puppeteer');
const fs = require('fs');


const arr = fs.readFileSync('music.txt').toString().split('\n');


async function main(music_name) {
    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();


        await page.goto(`https://www.youtube.com/results?search_query=${music_name}`);
        const href = await page.$eval("#video-title", (elm) => elm.href);
        console.log(href)
        fs.appendFileSync('music_link.txt', href + '\n', err => {
            if (err) throw err;
        })


        await browser.close();
        return
    } catch (err) {
        console.error(err);
    }
}

async function start() {
    for (let i of arr) {
        await main(i)
        console.log(i)
    }
}

start()