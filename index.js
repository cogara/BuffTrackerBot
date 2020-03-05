require('dotenv').config();

const Discord = require('discord.js')
const client = new Discord.Client()

let moment = require('moment');
moment().format();

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
    wcb : {
        display : "War Chief's Blessing",
        cooldown : 180 
    },
    sf : {
        display : 'Songflower',
        cooldown: 25
    },
    songflower : {
        display : 'Songflower',
        cooldown: 25
    },
    zandalar : {
        display : 'Spirit of Zandalar',
        cooldown: 120
    }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
//   const allyBuffChannel = client.channels.cache.find(ch => ch.name === 'ally-buffs').id
//   const hordeBuffChannel = client.channels.cache.find(ch => ch.name === 'horde-buffs').id
//   console.log('Ally: ' + allyBuffChannel);
//   console.log('Horde: ' + hordeBuffChannel);
  
})

client.on('message', msg => {
    if  (!msg.author.bot) {
        console.log(msg.content);
        
        if (msg.content.startsWith('!wb')) {

            // msg.delete()
            // split out parameters
            let command = msg.content.split(' ');
            command.splice(0,1);
            let buffType = command.splice(0,1)[0];
            let action = command.splice(0,1)[0];
            let time = command.splice(0,1)[0];
            let droppedBy = (command.length > 0) ? '- By: ' + command.join(" ") : '';
            if (!buffs[buffType.toLowerCase()]) {
                console.log('inavlid buff type'); 
                msg.reply(buffType + "is not a valid buff name. Please see pins for proper use.");
                msg.delete();
                return;
            }
            console.log(droppedBy);
            // a whole bunch of time BS
            let newTime = moment();
            newTime.set('hour',moment(time,"HH:mmA").hour());
            newTime.set('minute',moment(time,"HH:mmA").minute());
            newTime.add(buffs[buffType.toLowerCase()].cooldown,'minutes');


            if (action.toLowerCase() == 'dropped') {
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs[buffType.toLowerCase()].display}\n` +
                    `\`\`\`` +
                    `\`\`\`asciidoc\n` +
                    `Dropped ${time} Server Time ${droppedBy}\n` +
                    `===================\n` +
                    `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                    `\n` +
                    `Submitted by: ${msg.member.nickname}\n` +
                    `\`\`\`\n`
            } else if (action.toLowerCase() == 'planned'){
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs[buffType.toLowerCase()].display}` + 
                    `\`\`\`` + 
                    `\`\`\`asciidoc\n` + 
                    `PLANNED for ${time} Server Time ${droppedBy}\n`+ 
                    `====================\n`+ 
                    `Submitted by: ${msg.member.nickname}\n`+ 
                    `\`\`\`\n`
            } else {
                response = 'Invalid action. Must be "planned" or "dropped".'
            }

            msg.channel.send(response);
            // msg.delete()
        } else if (msg.content.startsWith('!sf')) {
            
            let command = msg.content.split(' ');
            command.splice(0,1);
            let location = command.splice(0,1)[0];
            let time = command.splice(0,1)[0];
            let newTime = moment();
            newTime.set('hour',moment(time,"HH:mmA").hour());
            newTime.set('minute',moment(time,"HH:mmA").minute());
            newTime.add(buffs['songflower'].cooldown,'minutes');

            response = 
                `\`\`\`fix\n` + 
                `Songflower - ${location}\n` +
                // `${buffs[buffType.toLowerCase()].display}\n` +
                `\`\`\`` +
                `\`\`\`asciidoc\n` +
                `Dropped ${time} Server Time\n` +
                `===================\n` +
                `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                `\n` +
                `Submitted by: ${msg.member.nickname} - ${msg.author.username}\n` +
                `\`\`\`\n`

            msg.channel.send(response);
            
        }
    }
})

client.on('message', msg => {
    // console.log('testingdddsds');
    
})

client.login(process.env.BOT_TOKEN);