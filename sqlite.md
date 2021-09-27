# NodeJs bot using sqlite3
## Without CRON
```js
const puppeteer = require('puppeteer');
const sqlite3 = require('sqlite3');

const url = 'http://url-of-the-chall';
const table = 'table_name';
const database_file = '/tmp/database.sqlite';

const cookie = {
  'name' : 'flag',
  'value' : 'F4k3_F14g',
  'url' : url,
  'secure': false
};

// Get an url
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

// Check and clear table
async function checkForMessage() {
  db = new sqlite3.Database(database_file);

  db.all('SELECT id,url FROM '+table, (err, rows) => {
    if (err) {
      console.error('Error fetching results');
      return;
    }
    if (rows.length == 0) {
      console.log("No URL in database.");
      return;
    } else {
      let stmt = db.prepare('DELETE FROM '+table+' WHERE id = ?');
      rows.forEach(async (row) => {
        stmt.run(row.id);
        await browse(row.url);
      });
      stmt.finalize();
    }
  });

  db.close();
}

// Infinite loop with timer
let minutes = 2;
setInterval(function() {
    console.log("Check for messages");
    checkForMessage();
}, minutes * 60 * 1000);
```
You just have to run it as a service: [Create service on linux](https://www.shubhamdipt.com/blog/how-to-create-a-systemd-service-in-linux/)

## With CRON
```js
const puppeteer = require('puppeteer');
const sqlite3 = require('sqlite3');

const url = 'http://url-of-the-chall';
const table = 'table_name';
const database_file = '/tmp/database.sqlite';

const cookie = {
  'name' : 'flag',
  'value' : 'F4k3_F14g',
  'url' : url,
  'secure': false
};

// Get an url
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

// Check and clear table
db = new sqlite3.Database(database_file);

db.all('SELECT id,url FROM '+table, (err, rows) => {
  if (err) {
    console.error('Error fetching results');
    return;
  }
  if (rows.length == 0) {
    console.log("No URL in database.");
    return;
  } else {
    let stmt = db.prepare('DELETE FROM '+table+' WHERE id = ?');
    rows.forEach(async (row) => {
      stmt.run(row.id);
      await browse(row.url);
    });
    stmt.finalize();
  }
});

db.close();

```
