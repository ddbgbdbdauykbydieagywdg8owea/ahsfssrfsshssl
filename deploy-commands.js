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
  new SlashCommandBuilder()
    .setName('1v1')
    .setDescription('Compare two players head to head')
    .addStringOption(opt =>
      opt.setName('player1').setDescription('First player').setRequired(true).setAutocomplete(true))
    .addStringOption(opt =>
      opt.setName('player2').setDescription('Second player').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('summary')
    .setDescription('Quick overview of a player')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('zdriftleaderboard')
    .setDescription('ZDrift leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('permleaderboard')
    .setDescription('Leaderboard for permanent challenges only')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('weeklyleaderboard')
    .setDescription('Leaderboard for Kazzmania weekly challenges')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('racingleaderboard')
    .setDescription('Leaderboard for weekly race challenges')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('zdriftimprove')
    .setDescription('Shows which ZDrift challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('zstats')
    .setDescription('View a players full ZDrift stats')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('zsummary')
    .setDescription('Quick ZDrift overview of a player')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('findbywr')
    .setDescription('Find a challenge by its world record time')
    .addStringOption(opt =>
      opt.setName('time').setDescription('WR time to search for (e.g. 12.345 or 1m 23.456s)').setRequired(true).setAutocomplete(true)),
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask the AI anything about Orion Drift')
    .addStringOption(opt =>
      opt.setName('question').setDescription('Your question').setRequired(true)),
  // Bouldering
  new SlashCommandBuilder()
    .setName('boulderingleaderboard')
    .setDescription('Bouldering leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('boulderingtop7leaderboard')
    .setDescription('Bouldering leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('boulderingwrleaderboard')
    .setDescription('Bouldering leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('boulderingimprove')
    .setDescription('Shows which bouldering challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Dribble
  new SlashCommandBuilder()
    .setName('dribbleleaderboard')
    .setDescription('Dribble leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('dribbletop7leaderboard')
    .setDescription('Dribble leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('dribblewrleaderboard')
    .setDescription('Dribble leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('dribbleimprove')
    .setDescription('Shows which dribble challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Driftball
  new SlashCommandBuilder()
    .setName('driftballleaderboard')
    .setDescription('Driftball leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('driftballtop7leaderboard')
    .setDescription('Driftball leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('driftballwrleaderboard')
    .setDescription('Driftball leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('driftballimprove')
    .setDescription('Shows which driftball challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Club
  new SlashCommandBuilder()
    .setName('clubleaderboard')
    .setDescription('Club leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('clubtop7leaderboard')
    .setDescription('Club leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('clubwrleaderboard')
    .setDescription('Club leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('clubimprove')
    .setDescription('Shows which club challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Parkour
  new SlashCommandBuilder()
    .setName('parkourleaderboard')
    .setDescription('Parkour leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('parkourtop7leaderboard')
    .setDescription('Parkour leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('parkourwrleaderboard')
    .setDescription('Parkour leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('parkourimprove')
    .setDescription('Shows which parkour challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Intro
  new SlashCommandBuilder()
    .setName('introleaderboard')
    .setDescription('Intro leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introtop7leaderboard')
    .setDescription('Intro leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introwrleaderboard')
    .setDescription('Intro leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introimprove')
    .setDescription('Shows which intro challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Ways To Climb
  new SlashCommandBuilder()
    .setName('waystoclimbleaderboard')
    .setDescription('Ways To Climb leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('waystoclimbtop7leaderboard')
    .setDescription('Ways To Climb leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('waystoclimbwrleaderboard')
    .setDescription('Ways To Climb leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('waystoclimbimprove')
    .setDescription('Shows which Ways To Climb challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
  // Intro Ways To Climb
  new SlashCommandBuilder()
    .setName('introwaystoclimbleaderboard')
    .setDescription('Intro Ways To Climb leaderboard ranked by points')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introwaystoclimbtop7leaderboard')
    .setDescription('Intro Ways To Climb leaderboard ranked by top 7 finishes')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introwaystoclimbwrleaderboard')
    .setDescription('Intro Ways To Climb leaderboard ranked by world records')
    .addIntegerOption(opt =>
      opt.setName('page').setDescription('Page number').setMinValue(1)),
  new SlashCommandBuilder()
    .setName('introwaystoclimbimprove')
    .setDescription('Shows which Intro Ways To Climb challenges a player has no top 100 entry on')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Player name').setRequired(true).setAutocomplete(true)),
].map(c => c.toJSON());

const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

(async () => {
  console.log('Registering slash commands...');
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  console.log('Done!');
})();
