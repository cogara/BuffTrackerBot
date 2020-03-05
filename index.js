require('dotenv').config();

const Discord = require('discord.js')
const client = new Discord.Client()



const buffs = {
    ony : {
        display : "Dragon Slayer (Onyxia)",
        cooldown : 360
    },
    onyxia : {
        display : "Dragon Slayer (Onyxia)",
        cooldown : 360
    },
    nef : {
        display : "Dragon Slayer (Nefarian)",
        cooldown : 480 
    },
    nefarian : {
        display : "Dragon Slayer (Nefarian)",
        cooldown : 480 
    },
    rend : {
        display : "War Chief's Blessing",
        cooldown : 180
    },
    WCB : {
        display : "War Chief's Blessing",
        cooldown : 180 
    },
    BVSF : {
        display : 'BVFP Songflower',
        cooldown: 25
    }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const allyBuffChannel = client.channels.cache.find(ch => ch.name === 'ally-buffs').id
  const hordeBuffChannel = client.channels.cache.find(ch => ch.name === 'horde-buffs').id
  console.log('Ally: ' + allyBuffChannel);
  console.log('Horde: ' + hordeBuffChannel);
  
})

client.on('message', msg => {
    if  (!msg.author.bot) {
        console.log(msg.content);
        
        if (!msg.content.startsWith('!wb')) {
            msg.reply('NOT A COMMAND IDIOT')
            msg.delete()
        } else {
            msg.channel.send('what');
            let command = msg.content.split(' ');
            let buffType = command[1],
                action = command[2],
                time = command[3];
            console.log(buffType);
            console.log(action);
            console.log(time);

            response = `
            \`\`\`py
            Hello?
            \`\`\`
            `
                
            msg.channel.send(response);
         
            
        }
        // msg.channel.send('testststststs');
        // msg.channel.send('ahhhhh');
        // !wb [ony|onyxia|nef|nefarian|wcb|rend|dragonslayer] [action] [time]
    }
})

client.on('message', msg => {
    // console.log('testingdddsds');
    
})

client.login(process.env.BOT_TOKEN);