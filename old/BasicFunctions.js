var Discord = require("discord.js");
var bot = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var time = new Date();
var n;

bot.on("message", msg => {
    if (msg.content.startsWith("/rot13")) {
        msg.delete();
        var d = msg;
        msg = msg.content.substring(7).replace(/[^A-Za-z]/g, " ");
        msg = msg.toLowerCase();
        var n = '';
        for (var i = 0; i < msg.length; i++) {
            if (msg.charAt(i) != ' ') {
                n += String.fromCharCode(((msg.charCodeAt(i) - 97) + 13) % 26 + 97);
            } else n += ' ';
        }
        d.channel.sendMessage(d.author.username + " > " + n);
    }
});

bot.on("message", msg => {

    if (msg.content.startsWith("/info")) {

        msg.channel.sendMessage(
            "http://i.imgur.com/sBFWAUd.png"
        );
        msg.channel.sendMessage(
            "I'm Daru, Supah Hakah of the FGL and Okarin's right hand man."
        );
        msg.channel.sendMessage(
            "Why do you want to know who I am?"
        );
        msg.channel.sendMessage(
            "I might tell you more if you give me lolis in exchange."
        );
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/nsfw") && msg.content.substring(6)) {
        xhr.onreadystatechange = function () {
            console.log("State: " + this.readyState);

            if (this.readyState === 4) {
                var file = this.responseText;
                var lis = file.split("file_url=\"");
                var lin = [];
                var n;
                for (var i = 0; i < lis.length; i++)
                    lin[i] = lis[i].substring(0, lis[i].indexOf(" ") - 1);
                n = lin[random(1, lin.length - 1)];
                if(n != "<?xm" && n) msg.channel.sendMessage("http:" + n)
                else msg.channel.sendMessage("Sorry, no lewd images")
            }
        };
        var info = msg.content.substring(6).replace(" ", "+");

        xhr.open("GET", "http://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=" + info);
        xhr.send();
    }
    if (msg.content == "/nsfw") {
        msg.channel.sendMessage("http://danbooru.donmai.us/posts/" + random(2100000, 2400000));
    }
});

bot.on("message", msg => {
    if (msg.content == "/help") {
        msg.channel.sendMessage(
            "```/help Displays this list \n/info Who am I? \n/chart Some interesting stats \n/chart-h Show this here \n/rot13 Spoiler protection system 1.41 \n/nsfw My favorite hobby \n/waifu What do I think of your waifu? \n/future Ever wanted to use the time machine? \n/dice Dice random numbers \n/div What's the world line?\n/sql-h Syntax for the chat datamining nerds\n/find Look for certain keywords\n/ran Find random messages\n/hist Display an histogram```"
        ) 
    }
})

bot.on("message", msg => {
    if (msg.content == "/chart") {
        var lin;
        date = new Date();
        msg.channel.fetchMessages({ limit: 61 }).then(messages => {
            var n = findMostNames(messages.array(), 60)
            lin = makeRoundChart(n);
            msg.author.sendMessage(lin);
            msg.delete();
        })
            .catch(console.log);
    }

    if (msg.content == "/chart-h") {
        var lin;
        date = new Date();
        msg.channel.fetchMessages({ limit: 61 }).then(messages => {
            var n = findMostNames(messages.array(), 60)
            lin = makeRoundChart(n);
            msg.channel.sendMessage(lin);
        }).catch(console.log);
    }

});

bot.on("message", msg => {
    if(msg.content.startsWith("/sonome")) {
        n = random(0, 10) == 0 ? random(0, 10) == 0 ? msg.channel.sendMessage("(\'_v\')") : msg.channel.sendMessage("fun^10 X int^40 = ir2") : msg.channel.sendMessage("その目だれの目？");
        msg.delete();
    }
});

bot.on("message", msg => {

    var obj =
        {
         "/nice": "https://i.imgur.com/7zthtFQ.jpg",
         "/counting": "http://i.imgur.com/OckHKoS.png",
         "/okay": "http://i.imgur.com/FcrUVuB.png",
         "/srsly": "http://i.imgur.com/jyZPMec.png",
         "/sorry": "http://i.imgur.com/ZvBm2GL.png",
         "/refuse": "http://i.imgur.com/vevF4bt.png",
         "/orz": "http://i.imgur.com/52JTsQX.png",
         "/ntmy": "http://i.imgur.com/LZbXegV.png",
         "/huh": "http://i.imgur.com/bE8s2Yg.png",
         "/hmpf": "http://i.imgur.com/uvbhPnV.png",
         "/blush": "http://i.imgur.com/yxDNKXX.png",
         "/wap": "http://i.imgur.com/G7yEeTU.png",
         "/wut": "http://i.imgur.com/MHpKssf.png",
         "/del": "http://i.imgur.com/UkGV1ss.png",
         "/wat": "http://i.imgur.com/UiWL1ib.png",
         "/amds": "http://i.imgur.com/P6N2wBA.png",
         "/ruok": "http://i.imgur.com/yD0I0KB.png"         
        }
    
    var n = msg.content.toLowerCase().split(" ");
    for (var i = 0; i < n.length; i++) {
        if (obj[n[i]] && msg.author.bot != true) {
            msg.channel.sendMessage(obj[n[i]]);
        }
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/div")) {
        n = new Date().getDate() / 13,351185
        n = n.toFixed(6);
        msg.channel.sendMessage("Current divergence is " + n);
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/future")) {
        n = (new Date().getDate() / 14).toFixed(5);
        n = msg.content.substring(8).length / n;
        n = String(n).replace(".", 0).charAt(4);
        if (n >= 6 && n <= 10) msg.channel.sendMessage("You're going full delusional");
        if (n >= 4 && n < 6) msg.channel.sendMessage("It looks like @channel has no ressources about this");
        if (n < 4) msg.channel.sendMessage("Faris says it looks good, believe the waifu");
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/dice") && msg.content.substring(6) != undefined) {
        msg.channel.sendMessage(random(0, msg.content.substring(6)));
    }
});

bot.on("message", msg => {
    if (msg.content.startsWith("/waifu")) {
        var bin = Buffer.from(msg.content.substring(7));
        for (var i = 1; i < bin.length; i++) {
            bin[i] = bin[i] + bin[i - 1];
        }
        msg.channel.sendMessage(
            "I'm of the opinion it deserves " + bin[bin.length - 1] + "% on the Faris meter.");
    }
});

function findMostNames(arr, lim) {
    var map = new Map();
    for (var i = 0; i < lim; i++) {
        map.set(arr[i].author.username, often(arr[i].author.username, lim, arr));
    }
    var z = map.entries();
    var n = [];
    for (var i = 0; i < lim; i++) {
        n[i] = z.next().value;
    }
    return n;
}

function often(name, lim, arr) {
    var n = 0;
    for (var i = 0; i < lim; i++) {
        if (name == arr[i].author.username) {
            n++;
        }
    }
    return n;
}

function makeRoundChart(n) {
    var name = [];
    var mes = [];
    for (var i = 0; n[i] != undefined; i++) {
        name[i] = n[i][0];
        mes[i] = n[i][1];
        name[i] = name[i].replace(/[^A-Za-z0-9]/g, "");
    }
    n = name.toString().replace(/,/g, '|');
    var m = mes.toString();
    var h = "http://chart.apis.google.com/chart?cht=p&chs=500x250&chdl=" + n + "&chl=" + n + "&chco=00FF00|00FFFF|FF0000|D0FA58|00FF80|FA5882&chp=0.436326388889&chtt=Who's+talking?&chts=000000,24&chd=t:" + m;
    return h;
}

function random(low, high) {
    return Math.round((Math.random() * (high - low) + low));
}


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.login("MTk4ODYzNjE5OTM1NTY3ODcy.Cslo4Q.c7zhxGxMI4rW4C_NvPj2vpZ3sDo");
