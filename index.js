const Discord = require('discord.js')
const  fetch = require('node-fetch');
const client = new Discord.Client()
require('dotenv').config();


const  sadWords = ["sad","depressed","unhappy","angry"]
const encouragements =["Cheer up!","Hang in there","You aare a great preson"]

function getQuote(){
    return fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    .then(data => {
       
        return data[0]["q"] + " -"  + data[0]["a"]
    })
}
getQuote()

client.on("ready",()=>{
    console.log(`Logged is as ${client.user.tag}!`)
})

client.on("message",msg=>{
    if(msg.author.bot) return

    if(msg.content === "$inspire"){
        getQuote().then(quote=>msg.channel.send(quote))
 
    }
    if(sadWords.some(word=>msg.content.includes(word))){
        const encouragement = encouragements[Math.floor(Math.random()*encouragements.length)]
        msg.reply(encouragement)
    }

})
client.login(process.env.TOKEN)
