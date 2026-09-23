const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;

// ============================================================
// PASTE YOUR 259 CHALLENGE IDs HERE
// ============================================================
const CHALLENGE_IDS = ["0039211B4C02864F696B85A078F817CD","00AA7B01486CAFCA4447A690EF471882",];

// ============================================================
// OPTIONAL CHALLENGE NAMES
// ============================================================
const CHALLENGE_NAMES = {
  "15B5D50548715AD9B409F0B3DE73ABF4": { name: "Verting", type: "perm" },
  "1DE99EFE4BF8C9948F487DA231824A75": { name: "Intro 1", type: "perm" },
  "EAE918404AE07841ED71A29FD272C08E": { name: "Intro 2", type: "perm" },
  "CB19D5744E666A9EF8115EBEA775CD5B": { name: "Intro 3", type: "perm" },
  "58897AC0430DE7DC1B447FBB93784544": { name: "Intro 4", type: "perm" },
  "AAAA215A4F710BCF0F7F45AC47C81D18": { name: "Intro 5", type: "perm" },
  "19C74A624FB40030182FCD8D95457FFB": { name: "Intro 6", type: "perm" },
  "533753B146F544C7FF0CD0AE15C08A06": { name: "Wall Run", type: "perm" },
  "1ED307CC40BAE77554C8E6B2DE4419BD": { name: "Pinch Climb", type: "perm" },
  "F7D49CA64CDD411A37140CADBD2F9CC7": { name: "Wall Climb", type: "perm" },
  "D8B2AB514524C336036961825D50474D": { name: "Corner Climb", type: "perm" },
  "158F86AF40A4136A8413FE83BA316671": { name: "Vehicle Vault", type: "perm" },
  "0788F9CE4D66440BFECFDF98F27F2AB3": { name: "Drop and Dive", type: "perm" },
  "E5BE61C242B1CA87F3F572A11D6DC427": { name: "Tuck n Weave", type: "perm" },
  "B1AF729548E1174514CA7DAD9B49DC6E": { name: "Gantry Jump", type: "perm" },
  "0039211B4C02864F696B85A078F817CD": { name: "Jungle Gym", type: "perm" },
  "B4844AEA47AEDAB2A62DBC82C840C198": { name: "JG Drop1", type: "perm" },
};

function getChallengeName(id) {
  return CHALLENGE_NAMES[id]?.name || id;
}

// ============================================================
// SET YOUR ALERT CHANNEL IDs HERE
// ============================================================
const WR_CHANNEL_ID = 'YOUR_WR_CHANNEL_ID_HERE';
const TOP7_CHANNEL_ID = 'YOUR_TOP7_CHANNEL_ID_HERE';

const POINTS = [
  0,
  1000,980,960,940,921,902,882,864,845,826,
  808,790,772,755,737,720,703,686,669,653,
  637,621,605,589,574,559,544,529,514,500,
  486,472,458,444,431,418,405,392,380,367,
  355,343,331,320,309,298,287,276,265,255,
  245,235,225,216,207,198,189,180,172,163,
  155,147,140,132,125,118,111,104,98,92,
  86,80,74,69,64,59,54,49,45,41,
  37,33,29,26,23,20,17,15,12,10,
  8,7,5,4,3,2,1,0,0,0
];

function getPoints(rank) {
  if (rank < 1 || rank > 100) return 0;
  return POINTS[rank];
}

function formatTime(seconds) {
  if (seconds === null || seconds === undefined) return 'N/A';
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(3);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

let cache = {};
let previousCache = {};
let playerStats = {};
let lastUpdated = null;

async function fetchChallenge(id) {
  try {
    const res = await axios.post(
      `https://api.oriondrift.net/v1/fleets/global/challenges/${id}/list?limit=100`,
      { user_id: null, friends: [] },
      { headers: { 'X-Api-Key': API_KEY, 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (e) {
    console.error(`Failed to fetch challenge ${id}:`, e.message);
    return null;
  }
}

async function checkAlerts(newCache) {
  const wrChannel = client.channels.cache.get(WR_CHANNEL_ID);
  const top7Channel = client.channels.cache.get(TOP7_CHANNEL_ID);

  for (const [challengeId, newEntries] of Object.entries(newCache)) {
    const oldEntries = previousCache[challengeId] || [];

    for (const newEntry of newEntries) {
      const oldEntry = oldEntries.find(e => e.user_id === newEntry.user_id || e.username === newEntry.username);

      // WR alert — rank 1 and either new or improved time
      if (newEntry.rank === 1) {
        const oldWr = oldEntries.find(e => e.rank === 1);
        const isNewWr = !oldWr || oldWr.username !== newEntry.username || oldWr.record !== newEntry.record;
        if (isNewWr && wrChannel) {
          const embed = new EmbedBuilder()
            .setTitle('🏆 New World Record!')
            .setColor(0xffd700)
            .setDescription(`**${newEntry.username}** set a new WR on **${getChallengeName(challengeId)}**\n⏱️ **${formatTime(newEntry.record)}**`)
            .setTimestamp();
          wrChannel.send({ embeds: [embed] }).catch(console.error);
        }
      }

      // Top 7 alert — rank 2-7 and either new entry or improved rank
      if (newEntry.rank >= 2 && newEntry.rank <= 7) {
        const wasAlreadyTop7 = oldEntry && oldEntry.rank <= 7;
        if (!wasAlreadyTop7 && top7Channel) {
          const embed = new EmbedBuilder()
            .setTitle('⭐ New Top 7!')
            .setColor(0x57f287)
            .setDescription(`**${newEntry.username}** entered the top 7 on **${getChallengeName(challengeId)}**\n🏅 Rank **#${newEntry.rank}** — ⏱️ **${formatTime(newEntry.record)}**`)
            .setTimestamp();
          top7Channel.send({ embeds: [embed] }).catch(console.error);
        }
      }
    }
  }
}

async function buildCache() {
  console.log(`Fetching ${CHALLENGE_IDS.length} challenges...`);
  previousCache = { ...cache };
  cache = {};
  playerStats = {};

  for (let i = 0; i < CHALLENGE_IDS.length; i++) {
    const id = CHALLENGE_IDS[i];
    const data = await fetchChallenge(id);
    if (data && Array.isArray(data.top)) {
      cache[id] = data.top;
    }
    if (i % 10 === 0) console.log(`  ${i + 1}/${CHALLENGE_IDS.length} fetched...`);
    await new Promise(r => setTimeout(r, 300));
  }

  for (const [challengeId, entries] of Object.entries(cache)) {
    entries.forEach(entry => {
      const rank = entry.rank;
      if (rank > 100) return;
      const name = entry.username || 'Unknown';
      const userId = entry.user_id || name;
      if (!playerStats[userId]) {
        playerStats[userId] = {
          name,
          totalPoints: 0,
          wrCount: 0,
          top7Count: 0,
          top100Count: 0,
          ranks: [],
          challenges: []
        };
      }
      playerStats[userId].totalPoints += getPoints(rank);
      playerStats[userId].top100Count++;
      if (rank === 1) playerStats[userId].wrCount++;
      if (rank <= 7) playerStats[userId].top7Count++;
      playerStats[userId].ranks.push(rank);
      playerStats[userId].challenges.push({
        challengeId,
        rank,
        record: entry.record
      });
    });
  }

  // Only check alerts after the first cache build (previousCache will be empty on first run)
  if (Object.keys(previousCache).length > 0) {
    await checkAlerts(cache);
  }

  lastUpdated = new Date();
  console.log(`Cache built! ${Object.keys(playerStats).length} players found.`);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await buildCache();
  setInterval(buildCache, 10 * 60 * 1000);
});

client.on('interactionCreate', async interaction => {

  if (interaction.isAutocomplete()) {
    const { commandName } = interaction;
    const focused = interaction.options.getFocused().toLowerCase();

    if (commandName === 'stats' || commandName === 'improve') {
      const matches = Object.values(playerStats)
        .filter(p => p.name.toLowerCase().includes(focused))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 25)
        .map(p => ({ name: p.name, value: p.name }));
      return interaction.respond(matches);
    }

    if (commandName === 'challenge') {
      const matches = CHALLENGE_IDS
        .filter(id => getChallengeName(id).toLowerCase().includes(focused) || id.toLowerCase().includes(focused))
        .slice(0, 25)
        .map(id => ({ name: getChallengeName(id), value: id }));
      return interaction.respond(matches);
    }
  }

  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'leaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      const avgRank = p.ranks.length
        ? (p.ranks.reduce((a, b) => a + b, 0) / p.ranks.length).toFixed(1)
        : 'N/A';
      return `#${rank} **${p.name}** — ${p.totalPoints.toLocaleString()} pts | 1st: ${p.wrCount} | Top7: ${p.top7Count} | Top100: ${p.top100Count} | Avg: ${avgRank}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift Global Leaderboard')
      .setColor(0xf5a623)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'stats') {
    await interaction.deferReply();
    const name = interaction.options.getString('name').toLowerCase();

    const player = Object.values(playerStats).find(p => p.name.toLowerCase() === name)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name));

    if (!player) {
      return interaction.editReply(`No player found matching **${interaction.options.getString('name')}**.`);
    }

    const sorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const globalRank = sorted.findIndex(p => p.name === player.name) + 1;

    const avgRank = player.ranks.length
      ? (player.ranks.reduce((a, b) => a + b, 0) / player.ranks.length).toFixed(1)
      : 'N/A';

    const challengeLines = player.challenges
      .sort((a, b) => a.rank - b.rank)
      .map(c => `#${c.rank} **${getChallengeName(c.challengeId)}** — ${formatTime(c.record)}`)
      .join('\n');

    const description = [
      `**Global Rank:** #${globalRank}`,
      `**Total Points:** ${player.totalPoints.toLocaleString()}`,
      `**World Records (1st):** ${player.wrCount}`,
      `**Top 100s:** ${player.top100Count}`,
      `**Avg Rank:** ${avgRank}`,
      ``,
      `**Challenge Appearances:**`,
      challengeLines || 'None',
    ].join('\n');

    const embed = new EmbedBuilder()
      .setTitle(player.name.slice(0, 256))
      .setColor(0x5865f2)
      .setDescription(description.slice(0, 4096))
      .setFooter({ text: `Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    return interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'challenge') {
    await interaction.deferReply();
    const id = interaction.options.getString('id').toUpperCase();

    const entries = cache[id];
    if (!entries || entries.length === 0) {
      return interaction.editReply(`No data found for challenge ID \`${id}\`.`);
    }

    const lines = entries.slice(0, 20).map(e => {
      return `#${e.rank} **${e.username}** — ${formatTime(e.record)}`;
    });

    const embed = new EmbedBuilder()
      .setTitle(`Challenge: ${getChallengeName(id)}`)
      .setColor(0x57f287)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Showing top ${Math.min(entries.length, 20)} of ${entries.length} entries` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'top7leaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.top7Count - a.top7Count);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      return `#${rank} **${p.name}** — Top7: ${p.top7Count} | 1st: ${p.wrCount} | Top100: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — Top 7 Leaderboard')
      .setColor(0xe91e63)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'wrleaderboard') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    const sorted = Object.values(playerStats).sort((a, b) => b.wrCount - a.wrCount);
    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      return `#${rank} **${p.name}** — WRs: ${p.wrCount} | Top7: ${p.top7Count} | Top100: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — World Record Leaderboard')
      .setColor(0xffd700)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'avg') {
    await interaction.deferReply();
    const page = interaction.options.getInteger('page') || 1;
    const perPage = 30;

    // Only include players in the global top 100
    const globalSorted = Object.values(playerStats).sort((a, b) => b.totalPoints - a.totalPoints);
    const top100Players = globalSorted.slice(0, 100);

    const sorted = top100Players
      .filter(p => p.ranks.length > 0)
      .sort((a, b) => {
        const avgA = a.ranks.reduce((x, y) => x + y, 0) / a.ranks.length;
        const avgB = b.ranks.reduce((x, y) => x + y, 0) / b.ranks.length;
        return avgA - avgB;
      });

    const totalPages = Math.ceil(sorted.length / perPage);
    const slice = sorted.slice((page - 1) * perPage, page * perPage);

    if (slice.length === 0) {
      return interaction.editReply('No data yet, try again in a moment.');
    }

    const lines = slice.map((p, i) => {
      const rank = (page - 1) * perPage + i + 1;
      const avg = (p.ranks.reduce((a, b) => a + b, 0) / p.ranks.length).toFixed(1);
      return `#${rank} **${p.name}** — Avg Rank: ${avg} | Top100s: ${p.top100Count}`;
    });

    const embed = new EmbedBuilder()
      .setTitle('Orion Drift — Best Average Rank (Top 100 Players)')
      .setColor(0x9b59b6)
      .setDescription(lines.join('\n'))
      .setFooter({ text: `Page ${page}/${totalPages} • Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    interaction.editReply({ embeds: [embed] });
  }

  else if (commandName === 'improve') {
    await interaction.deferReply();
    const name = interaction.options.getString('name').toLowerCase();

    const player = Object.values(playerStats).find(p => p.name.toLowerCase() === name)
      || Object.values(playerStats).find(p => p.name.toLowerCase().includes(name));

    if (!player) {
      return interaction.editReply(`No player found matching **${interaction.options.getString('name')}**.`);
    }

    const playerChallengeIds = new Set(player.challenges.map(c => c.challengeId));
    const missing = CHALLENGE_IDS.filter(id => !playerChallengeIds.has(id));

    if (missing.length === 0) {
      return interaction.editReply(`**${player.name}** has a top 100 entry on every challenge!`);
    }

    const lines = missing.map(id => `• **${getChallengeName(id)}**`);

    const description = [
      `**${player.name}** has no top 100 entry on ${missing.length} challenge${missing.length === 1 ? '' : 's'}:`,
      ``,
      lines.join('\n'),
    ].join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`${player.name} — Challenges to Improve`)
      .setColor(0xe67e22)
      .setDescription(description.slice(0, 4096))
      .setFooter({ text: `Updated: ${lastUpdated?.toLocaleTimeString() || 'N/A'}` });

    return interaction.editReply({ embeds: [embed] });
  }
});

client.login(BOT_TOKEN);
