var Discord = require("discord.js");
var bot = new Discord.Client();
var sqlite3 = require("sqlite3")
var db = new sqlite3.Database("chat");

bot.on("message", msg => {
        var date = new Date(msg.createdTimestamp).toISOString();
        var channel = "dmc";
        var server = " ";
        var content = " ";
        var name = "bot";
        var nick = " ";
        if (msg.channel.guild) server = msg.channel.guild.name;
        if (msg.author.username) name = msg.author.username;
        if (msg.channel.name) channel = msg.channel.name;
        if (msg.content) content = msg.content;
        if (msg.member) nick = msg.member.nickname;
        db.all("INSERT INTO dis values(?, ?, ?, ?, ?, ?)", server, name, nick, content, date, channel);
});

bot.on('ready', () => {
    console.log('ready!');
});

bot.login("MTk4ODYzNjE5OTM1NTY3ODcy.Cslo4Q.c7zhxGxMI4rW4C_NvPj2vpZ3sDo");