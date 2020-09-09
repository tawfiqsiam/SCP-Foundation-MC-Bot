const discord = requrie('discord.js'); //The disocrd.js package / discord ap
const fs = require('fs');
const coins = require('./data/coins.json');
const xp = require('./data/xp.json');
var color = require('./data/colors.json');

const client = new discord.Client(); // The Discord Bot Client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.activity_list = [
    `with my creator anime`,
    `with BlackDevWolve anime`,
    `with my creator anime`
  ]
  client.user.setPresence({
    game: {
      type: "WATCHING",
      name: "nothing" + ` | .help`
    },
    status: "idle"
  });
  
  setInterval(() => {
    const index = Math.floor(
      Math.random() * (client.activity_list.length - 1) + 1
    );
    client.user.setPresence({
      game: {
        type: "WATCHING",
        name: client.activity_list[index] + ` | .help`
      },
      status: "idle"
    });
  }, 10000);
  
});

client.on('message', async msg => {
  var prefix = '.';
  if (msg.author.bot) return;

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd)

  if (!xp[msg.author.id]) {
    xp[msg.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let nxtLvl = xp[msg.author.id].level * 300;
  let curxp = xp[msg.author.id].xp;
  let curlvl = xp[msg.author.id].level;
  xp[msg.author.id].xp = curxp + xpAdd;
  if (nxtLvl <= xp[msg.author.id].xp) {
    xp[msg.author.id].level = curlvl + 1;
    let levelupembed = new discord.MessageEmbed()
    .setTitle('Level UP!')
    .setDescription(`Congratulation, <@${msg.author.id}>! \n Your Level ist now ${curlvl + 1} <a:paaartyyyyyyyy:702463831204560896>`)
    .setColor(color.bluepurpel);
    msg.channel.send(levelupembed);
  }
  fs.writeFile("./data/xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err);
  });
  if (!coins[msg.author.id]){
    coins[msg.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`)

  if (coinAmt == baseAmt) {
    coins[msg.author.id] = {
      coins: coins[msg.author.id].coins + coinAmt
    };
  }
  fs.writeFile("./data/coins.json", JSON.stringify(coins), (err) => {
    console.log(err);
  });
 

  //prefix-check
  if (!msg.content.startsWith(prefix)) return;
  
  //definitions
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  // auto react
  if (msg.channel.id == '702227041755594862') {
    msg.react('702246901839298751');
  }
  if (msg.channel.id == '701709152699023443') {
    msg.react('702246911549112371');
  }

  if (msg.channel.id == '701709196047024229' || msg.channel.id == '702149332794736681' || msg.channel.id == '702149414591922197') {
    msg.react('702248711723548792');
  }

  //Command Starts
  if (cmd == 'help') {
    var helpembed = new discord.MessageEmbed()
    .setTitle('Oops')
    .setDescription('The helpcommand is in building')
    .setColor('#eb3333');
    msg.channel.send(helpembed);
  }

  //say command
  if (cmd == 'say') {
    const sayembed = new discord.MessageEmbed()
    sayembed.setDescription(args.join(' '));
    sayembed.setColor('#ff0000')
    msg.channel.send(sayembed);
  }
  
  // Level Command
  if (cmd == 'rank') {
    if (!xp[msg.author.id]) {
       xp[msg.author.id] = {
        xp: 0,
        level: 1
       };
    }

    let nxtLvlXp = curlvl * 300;
    let difference = nxtLvlXp - curxp;
    let lvlembed = new discord.MessageEmbed()
    .setTitle(`Level infos from ${msg.author.username}`)
    .addField("Level:", curlvl, true)
    .addField("XP:", curxp, true)
    .setFooter(`Missing XPs to next level: ${difference}`)
    .setColor(color.green);
    msg.channel.send(lvlembed);
  }

  // Coin Command UNDER DEVELOPMENT
  if (cmd == 'coins') {

  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.id === '702227041755594862')
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to SCP Foundation MC, ${member}`);
  var botrole = member.guild.roles.cache.find(role => role.id == '702113679637872720');
  var userrole = member.guild.roles.cache.find(role => role.id == '701708431270215721')
  if (!member.user.bot) { //If is a user then the bot will give the user role. Else if its a bot the will the bot give the bot role
    member.roles.add(userrole);
  } else {
    member.roles.add(botrole);
  }
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.id == '702227041755594862');
  if (!channel) return;
  channel.send(`${member.displayName} leaved. Members: ${member.guild.memberCount}`);
});

client.login('NTE4NTM5NzE1OTgxNjA2OTE0.DuSPxg.8JLYLQy9STry1Cd4B9-q85F2c3E');
