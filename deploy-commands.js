const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const CLIENT_ID = '1552102106696126565';
const BOT_TOKEN = 'MTU1MjEwMjEwNjY5NjEyNjU2NQ.GRJkq9.cuFmi-lsRwieQkFtLBX4cDAUlwWhDixy8Yw-jA';

const commands = [
  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the overall player leaderboard')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('player')
    .setDescription('Look up a player by name')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('challenge')
    .setDescription('View the top 100 for a challenge')
    .addStringOption(opt =>
      opt.setName('id').setDescription('Challenge ID').setRequired(true).setAutocomplete(true)),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
  console.log('Registering slash commands...');
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  console.log('Done!');
})();