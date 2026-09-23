const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const CLIENT_ID = '1552102106696126565';
const BOT_TOKEN = process.env.BOT_TOKEN;

const commands = [
  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the overall player leaderboard')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View a players full stats')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('challenge')
    .setDescription('View the top 100 for a challenge')
    .addStringOption(opt =>
      opt.setName('id').setDescription('Challenge ID').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('top7leaderboard')
    .setDescription('Leaderboard ranked by number of top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('wrleaderboard')
    .setDescription('Leaderboard ranked by number of world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('avg')
    .setDescription('Leaderboard ranked by best average rank (top 100 global players only)')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('improve')
    .setDescription('Shows which challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
  console.log('Registering slash commands...');
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  console.log('Done!');
})();
