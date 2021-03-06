
/*-----------------------------------------------------------------------------
This bot is a first version of BliBlaBlo for natural language.

More info about LUIS at :

    http://docs.botframework.com/builder/node/guides/understanding-natural-language/

-----------------------------------------------------------------------------*/

//var builder = require('../../');

var restify = require('restify');
var builder = require('./botbuilder');

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);

var dialog = new builder.LuisDialog('https://api.projectoxford.ai/luis/v1/application?id=6c459053-219e-4a87-b844-6308c71e4332&subscription-key=1fd3435757ae474ca219e29c517f5137&q=');
bot.add('/', dialog);

dialog.on('Replay', builder.DialogAction.send("I'll soon be able to replay the sequence you want"));
dialog.on('Translate', builder.DialogAction.send("I'll soon be able to give you the right translation"));
dialog.on('Transcript', builder.DialogAction.send("I'll soon be able to give you the subtitle you want"));
dialog.on('None', builder.DialogAction.send("I'am not sure what you mean yet. I am getting trained. Please try again soon."));


bot.listenStdin();

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
  'directory': '.',
  'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


