import datetime
import discord
import asyncio
import sqlite3
import sys

client = discord.Client()
base = sqlite3.connect('chat.db')
db = base.cursor()

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

@client.event
async def on_message(msg):
    try:
        #assign the fields
        date = msg.timestamp.isoformat()
        name = msg.author.name
        server = " "
        content = msg.content
        channel = " "
        nick = "bot"
        if not msg.channel.is_private:
            channel = msg.channel.name
            server = msg.channel.server.name
        else:
            channel = "dmc"
        if not msg.author.bot:
            nick = msg.author.nick

        data = (channel, name, nick, content, date, server)

        db.execute("INSERT INTO dis values(?,?,?,?,?,?)", data)
        base.commit()
    except Exception as e:
        if not msg.channel.is_private:
            emoji = msg.server.get_member("277821614345945089")
            ghost = msg.server.get_member("127658424082104320")
            err = str(e)
            err = err.replace(" ", "+")
            content = "Hey, I'm sorry to bother you but it looks like I had a mental breakdown and need some... uh... ~~lolipics~~ one who's able to check if I'm still online and who'll give me... this... ~~stuff~~ feeling of being an important Supah Hakah again\n\n\nSince you're a lazy fucker I've already generated a helpful link for you\n\n\nhttps://www.google.com/?gfe_rd=cr&ei=I9oFWZC5JNGv8wei0aKABg#q=" + err
            try:
                if emoji is not None:
                    await client.send_message(emoji, content)
                if ghost is not None:
                    await client.send_message(ghost, content)
            except:
                pass
        
client.run("token")
