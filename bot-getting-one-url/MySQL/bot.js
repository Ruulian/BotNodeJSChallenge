const puppeteer = require('puppeteer');
const config = require("./config.json");

const cookie = {
  'name' : config.bot.cookies.name,
  'value' : config.bot.cookies.value,
  'url' : config.bot.cookies.domain,
  'secure': config.bot.cookies.secure,
  'httpOnly': config.bot.cookies.httpOnly
};

async function browse(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
  });
  try {
    var page = await browser.newPage();
    await page.setCookie(cookie);
    await page.goto(url);
    await browser.close();
  } catch (error) {
    await browser.close();
  } finally {
    await browser.close();
  }

  return true;
}

let minutes = config.bot.frequency;

setInterval(function() {
    console.log("Check for messages");
    browse(config.bot.target);
}, minutes * 60 * 1000);