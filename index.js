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
        let sendTimer = true;
        let submittedBy, response = "";
        let message = msg.content.split(' ');
        let command = message.splice(0,1)[0].toLowerCase();
        let actionOrLoc = message.splice(0,1)[0]; 
        let time = message.splice(0,1)[0]; 
        let droppedBy = (message.length > 0) ? '- By: ' + message.join(" ") : '';

        // a whole bunch of time BS
        let newTime = moment();
        newTime.set('hour',moment(time,"HH:mmA").hour());
        newTime.set('minute',moment(time,"HH:mmA").minute());

        switch(command) {
            case '!ony':
            case '!onyxia':
                newTime.add(buffs['ony'].cooldown,'minutes');
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs['ony'].display}\n` +
                    `\`\`\``;
                if (actionOrLoc.toLowerCase() == 'dropped') {
                    response += 
                        `\`\`\`asciidoc\n` +
                        `Dropped ${time} Server Time ${droppedBy}\n` + 
                        `===================\n` +
                        `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                        '';
                } else if (actionOrLoc.toLowerCase() == 'planned') {
                    response += 
                        `\`\`\`asciidoc\n` + 
                        `[PLANNED for ${time} Server Time ${droppedBy}]\n`;
                } else {
                    sendTimer = false;
                    msg.channel.send('Improper action - use !help for more info');
                    msg.delete();
                }
                break;
            case '!nef':
            case '!nefarian':
                newTime.add(buffs['nef'].cooldown,'minutes');
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs['nef'].display}\n` +
                    `\`\`\``;
                    if (actionOrLoc.toLowerCase() == 'dropped') {
                        response += 
                            `\`\`\`asciidoc\n` +
                            `Dropped ${time} Server Time ${droppedBy}\n` +
                            `===================\n` +
                            `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                            '';
                    } else if (actionOrLoc.toLowerCase() == 'planned') {
                        response +=
                            `\`\`\`asciidoc\n` + 
                            `[PLANNED for ${time} Server Time ${droppedBy}]\n`;
                    } else {
                        sendTimer = false;
                        msg.channel.send('Improper action - use !help for more info');
                        msg.delete();
                    }
                break;
            case '!wcb':
            case '!rend':
                newTime.add(buffs['wcb'].cooldown,'minutes');
                response = 
                    `\`\`\`fix\n` + 
                    `${buffs['wcb'].display}\n` +
                    `\`\`\``;
                    if (actionOrLoc.toLowerCase() == 'dropped') {
                        response += 
                            `\`\`\`asciidoc\n` +
                            `Dropped ${time} Server Time ${droppedBy}\n` +
                            `===================\n` +
                            `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                            '';
                    } else if (actionOrLoc.toLowerCase() == 'planned') {
                        response += 
                            `\`\`\`asciidoc\n` + 
                            `[PLANNED for ${time} Server Time ${droppedBy}]\n`;
                    } else {
                        sendTimer = false;
                        msg.channel.send('Improper action - use !help for more info');
                        msg.delete();
                    }
                break;
            case '!sf':
            case '!songflower':
                newTime.add(buffs['sf'].cooldown,'minutes');
                if (!moment(time,['hh:mm','h:mm','hh:mmA','h:mmA'],true).isValid()) {
                    msg.reply('Time must be 3rd parameter. See !help for more information');
                    msg.delete();
                    return;
                }
                response = 
                    `\`\`\`fix\n` + 
                    `Songflower - ${actionOrLoc}\n` +
                    `\`\`\`` + 
                    `\`\`\`asciidoc\n` +
                    `Picked ${time} Server Time\n` +
                    `===================\n` +
                    `[Next Available ${newTime.format('hh:mmA')} Server Time]\n` +
                    ``;

                    break;
            case '!help': 
                response = 
                    `\`\`\`` +
                    `To log a buff time - please follow the below format:\n` +
                    `![ony|onyxia|nef|nefarian|wcb|rend|sf|songflower] [planned|dropped|location] [time] [player]\n\n` +
                    `Examples for shared buffs:\n` + 
                    `!ony dropped 10:30pm\n` +
                    `!nef planned 9:44am <guild> player\n` +
                    `The player is optional, and if provided, will say who a buff was dropped by or is planned by.\n\n` +
                    `Examples for songflower:\n` + 
                    `!sf BVFP 3:28pm\n\n` +
                    `For songflowers, the second argument is the location, and must not include any spaces. Use generally accepted acronyms or short names.` +
                    `\`\`\``;
                    msg.channel.send(response);
                    msg.delete();
                    sendTimer = false;
                    // return;
                    break;
            default:
                sendTimer = false;
                msg.channel.send(`"${msg.content}" is not a valid command - use !help for more info`);
                if (!msg.member.roles.cache.some(role =>['Nodel','Admin','[A] Moderator','[H] Moderator'].includes(role.name))) {
                    msg.delete();
                }
                break; 
        }

        
        submittedBy = 
            `\n` +
            `Submitted by: ${(msg.member.nickname) ? msg.member.nickname + '-' : ''} ${msg.author.username}\n` +
            `\`\`\`\n`;

        // console.log((msg.member.roles.cache.some(role =>['tell me false'].includes(role.name))));
        
        if (sendTimer) {
            msg.channel.send(response + submittedBy);
            msg.delete();
        }

    }
})

client.on('message', msg => {
    // console.log('testingdddsds');
    
})

client.login(process.env.BOT_TOKEN);