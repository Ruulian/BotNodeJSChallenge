# Bot getting one url

In some challenges, we want a bot which get only one url (his profile for example).

Bots here are fetching only one url specified in ``config.json``.

## Setup

Install node and npm:
```
sudo apt install nodejs npm
```

Install npm packages:
```
npm install puppeteer
```

Edit [config.json](config.json) with your informations:
```json
{
    "bot":{
        "cookies":{
            "name":"flag",
            "value":"flag{F4k3_Fl4g}",
            "domain":"https://example.domain.com",
            "secure":false,
            "httpOnly":false
        },
        "frequency":2,
        "target":"https://example.domain.com/profile"
    }
}
```

And just run the bot :-)
```
node bot.js
```

## NPM Packages
- [Puppeteer](https://www.npmjs.com/package/puppeteer)