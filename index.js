const discord = requrie('discord.js'); //The disocrd.js package / discord api

const client = new discord.Client(); // The Discord Bot Client

client.on('ready', () => {
  client.activity_list = [
    `with my creator anime`,
    `with BlackDevWolve anime`,
    `with my creator anime`
  ]
  bot.user.setPresence({
    game: {
      type: "WATCHING",
      name: "nichts" + ` | .help`
    },
    status: "idle"
  });
  
  setInterval(() => {
    const index = Math.floor(
      Math.random() * (bot.activity_list.length - 1) + 1
    );
    bot.user.setPresence({
      game: {
        type: "WATCHING",
        name: bot.activity_list[index] + ` | .help`
      },
      status: "idle"
    });
  }, 10000);
  
});

client.on('message', msg => {
  var prefix = '.';
  
  //prefix-check
  if (!message.content.startsWith(prefix)) return;
  
  //definitions
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  //Command Starts
  
  //Help Command
  if (cmd == 'help') {
    var helpembed = new discord.MessageEmbed()
    .setTitle('Oops')
    .setDescription('The helpcommand is in building')
    .setColor('#eb3333');
  }
  // Userinfo Command
  if (cmd == 'userinfo') {
    var errorembed = new discord.MessageEmbed()
    const user = msg.mentions.users.first()
    if(!user){
      errorembed.setTitle('No no no')
      errorembed.setDescription('Give me an user!')
    }
    var useriembed = new discord.MessageEmbed()
    useriembed.setTitle(`Informaitons of ${user.tag}`)
    useriembed.addField('Name:', `${user.username}#${user.discriminator}`)
    useriembed.addField('ID:', `${user.id}`)
    useriembed.addField('Joined discord at:', `${user.createdAt}`) 
    useriembed.setColor('#00FFFF');
    msg.channel.send(useriembed);
  }

});

client.login('');
