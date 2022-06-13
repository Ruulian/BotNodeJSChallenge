## Setup

Install node and npm:
```
sudo apt install nodejs npm
```

Install npm packages:
```
npm install sqlite3 puppeteer
```

Edit [config.json](config.json) with your informations:
```json
{
    "challenge":{
        "flag":"flag{F4k3_Fl4g}",
        "url":"https://example.domain.com",
        "bot_frequency":2
    },
    "database":{
        "db_path":"/tmp/db.sqlite",
        "table":"table"
    }
}
```

And just run the bot :-)
```
node bot.js
```

## Npm packages
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [Sqlite3](https://www.npmjs.com/package/sqlite3)