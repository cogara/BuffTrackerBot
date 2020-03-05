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
            // split out parameters
            let command = msg.content.split(' ');
            command.splice(0,1);
            let buffType = command.splice(0,1)[0];
            let action = command.splice(0,1)[0];
            let time = command.splice(0,1)[0];
            let droppedBy = (command.length > 1) ? '- By: ' + command.join(" ") : '';
            if (!buffs[buffType]) {
                console.log('inavlid buff type'); 
                msg.reply(buffType + "is not a valid buff name. Please see pins for proper use.");
                msg.delete();
                return;
            }

            // a whole bunch of time BS
            let newTime = moment();
            newTime.set('hour',moment(time,"HH:mmA").hour());
            newTime.set('minute',moment(time,"HH:mmA").minute());
            newTime.add(buffs[buffType].cooldown,'minutes');


            if (action.toLowerCase() == 'dropped') {
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs[buffType].display}\n` +
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
                    `${buffs[buffType].display}` + 
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
        }
    }
})

client.on('message', msg => {
    // console.log('testingdddsds');
    
})

client.login(process.env.BOT_TOKEN);