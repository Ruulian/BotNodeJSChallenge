const puppeteer = require('puppeteer');
const sqlite3 = require('sqlite3');
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
    const page = await browser.newPage();
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

async function checkForMessage() {
  db = new sqlite3.Database(config.database.db_path);

  db.all(`SELECT id,url FROM ${config.database.table}`, (err, rows) => {
    if (err) {
      console.error('Error fetching results');
      return;
    }
    if (rows.length == 0) {
      console.log("No URL in database.");
      return;
    } else {
      console.log(rows);
      let stmt = db.prepare(`DELETE FROM ${config.database.table} WHERE id = ?`);
      rows.forEach(async (row) => {
        stmt.run(row.id);
        await browse(row.url);
      });
      stmt.finalize();
    }
  });

  db.close();
}

let minutes = config.bot.frequency;

setInterval(function() {
    console.log("Check for messages");
    checkForMessage();
}, minutes * 60 * 1000);