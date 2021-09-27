# Node JS bot for challenges
I had to code a bot for challenges which I created. It must get all url with specific cookies in a database and delete the table content every 2 minutes.
There are 2 ways that I found to do this. I can make a code that will be executed by CRON or make a code with a loop and a timeout.

## Code
Without CRON
```js
var mysql = require('mysql');
var puppeteer = require('puppeteer');

// Variables:
var table = 'table';
var database = 'database_name';
var user = 'username';
var password 'password';
var domain = "challenge_url";
var socketPath = "/var/run/mysqld/mysqld.sock"; // SQL socket to connect to the database

var conn = mysql.createConnection({
    socketPath: socketPath,
    database: database,
    user: user,
    password: password
});

function checkForMessage() {
    const getPage = async (url) => {
        const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser'});
        const page = await browser.newPage();
        const cookies = {'name' : 'flag', 'value' : 'F4k3_Fl4g', 'url' : domain};
        await page.setCookie(cookies);
        await page.goto(url);
        await browser.close();
    };

    conn.query("SELECT * FROM " + table, function (err, result) {
        if (err) throw err;
        if (typeof result != 'undefined') {
            result.forEach(element => {
                var url = element.url;
                console.log("getting url")
                getPage(url);
            });
        }
    });

    conn.query("DELETE FROM " + table, function (err, result) {
        console.log("delete database")
        conn.destroy()
    });
}

let minutes = 2;

setInterval(function() {
    console.log('Checking for new messages');
    checkForMessage();
}, minutes * 60 * 1000);
```
And you just have to launch it as a service

With CRON
```js
var mysql = require('mysql');
var puppeteer = require('puppeteer');

var table = 'table';
var database = 'database_name';
var user = 'username';
var password 'password';
var domain = "challenge_url";
var socketPath = "/var/run/mysqld/mysqld.sock"; // SQL socket to connect to the database

var conn = mysql.createConnection({
    socketPath: socketPath,
    database: database,
    user: user,
    password: password
});


const getPage = async (url) => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser'});
    const page = await browser.newPage();
    const cookies = {'name' : 'flag', 'value' : 'FLAG', 'url' : domain};
    await page.setCookie(cookies);
    await page.goto(url);
    await browser.close();
};

conn.query("SELECT * FROM " + table, function (err, result) {
    if (err) throw err;
    if (typeof result != 'undefined') {
        result.forEach(element => {
            var url = element.url;
            console.log("getting url")
            getPage(url);
        });
    }
});

conn.query("DELETE FROM " + table, function (err, result) {
    console.log("delete database")
    conn.destroy()
});

```
CRON:
```bash
*/2 * * * * /path/to/launcher/launch_bots.sh > /path/to/logs/logs.txt # You can launch with sh file if you have several bots
```
sh file content
```sh
# Put the full path of node binary and bot file
/bin/node /home/ubuntu/bots/bot1.js
```
