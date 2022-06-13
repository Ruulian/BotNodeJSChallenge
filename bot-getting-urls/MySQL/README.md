## Setup

Install node and npm:
```
sudo apt install nodejs npm
```

Install npm packages:
```
npm install mysql puppeteer
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
        "username":"username",
        "password":"password",
        "table":"table",
        "database_name":"database_name"
    }
}
```

And just run the bot :-)
```
node bot.js
```

## Npm packages
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
- [MySQL](https://www.npmjs.com/package/mysql)