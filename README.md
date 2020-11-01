# Neuron Telegram Bot

This is a rough sketch of a personal assistance bot that integrates with [neuron](https://github.com/srid/neuron/). Neuron is a digital tool for implementing the [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten) method for note-taking.

To use the bot, you must [create your own telegram bot](https://core.telegram.org/bots) and host this application yourself.

You have to configure the application with a git repository in which you maintain your neuron notes. Any changes to your notes will be pushed to this repository by the bot. The bot is password protected and only users with this password can let the bot do anything.

## Available commands

## /new_note

Creates a new note and takes the entire message (except for the command in the beginning) as the note's content.

New notes are created with the tags `unsorted` and `automated/neuron-telegram-bot`.

## Starting the bot

You can deploy the bot directly from docker hub. Use the [docker-compose file](./docker-compose.production.yml). You need to create a `.env` file and put it next to the docker-compose file. A template for this .env file with all possible configuration options can be found [here](.env.example).
