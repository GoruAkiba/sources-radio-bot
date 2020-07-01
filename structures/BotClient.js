// init
const { Client } = require("discord.js");
const YouTube = require("simple-youtube-api");
const GOOGLE_API_KEY = process.env.YT_API;

// Extend class
class botClient extends Client {
	constructor(opt) {
		super(opt);

		// define constructor
		this.util = require("../utils/util");
		this.queue = new Map();
		this.players = require("../utils/players");
		this.youtube = new YouTube(GOOGLE_API_KEY);

		this.colors = require("../bot_setting.json").colors;
	}
}

module.exports = botClient;
