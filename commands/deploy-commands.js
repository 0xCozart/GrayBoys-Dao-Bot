const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('register')
    .setDescription('registers ethereum address')
    .addStringOption((option) =>
      option
        .setName('address')
        .setDescription('Ethereum address starting in 0x...')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('admin clear')
    .setDescription('votes for a proposal')
    .addSubcommand((subcommand) => {
      subcommand
        .setName('user')
        .setDescription('clears registered user')
        .addStringOption((option) =>
          option.setName('userId').setRequired(true)
        );
    }),
  new SlashCommandBuilder()
    .setName('proposal')
    .setDescription('creates a voting event'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
