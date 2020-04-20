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
      type: "PLAYING",
      name: "nichts" + ` | .help`
    },
    status: "idle"
  });
  
});
