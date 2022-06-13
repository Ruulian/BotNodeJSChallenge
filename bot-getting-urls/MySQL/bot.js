const puppeteer = require('puppeteer');
const mysql = require('mysql');
const config = require("./config.json");

const cookie = {
  'name' : config.bot.cookies.name,
  'value' : config.bot.cookies.value,
  'url' : config.bot.cookies.domain,
  'secure': config.bot.cookies.secure,
  'httpOnly': config.bot.cookies.httpOnly
};

var conn = mysql.createConnection({
    socketPath: "/var/run/mysqld/mysqld.sock",
    database: config.database.database_name,
    user: config.database.username,
    password: config.database.password
});

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

async function checkForMessage() {
    conn.query(`SELECT id,url FROM ${config.database.table}`, (err, rows) => {
    if (err) {
      console.error('Error fetching results');
      return;
    }
    if (rows.length == 0) {
      console.log("No URL in database.");
      return;
    } else {
      console.log(rows);
      rows.forEach(async (row) => {
        conn.query(`DELETE FROM ${config.database.table} WHERE id = ${row.id}`);
        await browse(row.url);
      });
      stmt.finalize();
    }
  });

  conn.close();
}

let minutes = config.bot.frequency;

setInterval(function() {
    console.log("Check for messages");
    checkForMessage();
}, minutes * 60 * 1000);