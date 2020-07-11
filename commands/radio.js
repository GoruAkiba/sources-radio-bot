/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// init
const Discord = require("discord.js");
const {radioServer, colors} = require("../bot_setting.json");
const prefix = process.env.Prefix;


module.exports = {
	name : "radio",
	description: "Play radio from listed channel",
	aliases : ["ra"],
	ussage : "[radio list-number]",
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message,args){
		var msg = message;
		const voiceChannel = msg.member.voice.channel;
		const youtube = client.youtube;
		const colors = client.colors;
		const type = "Radio";
		const utils = client.util;
		const listServer = await client.radioList;
		// console.log(listServer);

		// const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
		if(!args[0]) {
			var list = listServer.channel.map((e,i) => {return `[${utils.addZero(i+1,2)}] ${e.name}`}),
				dscp = `for request a radio stream please use \`${prefix}radio [number]\`\n **for eg:** \`\`${prefix}radio 2\`\`\n`;
			var embed = new Discord.MessageEmbed()
			.setTitle("List of available radio Ch")
			.setColor(colors.accent)
			.setDescription(dscp+`\`\`\`css\n${list.join("\n")}\`\`\``)
			.setFooter("Thanks to GB_Sources radio project");
			
			return message.channel.send(embed);
		}

		if (!voiceChannel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play a Radio!");
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has("CONNECT")) {
				return msg.channel.send("Sorry, but I need **`CONNECT`** permissions to proceed!");
		}
		if (!permissions.has("SPEAK")) {
				return msg.channel.send("Sorry, but I need **`SPEAK`** permissions to proceed!");
		}

		var radio_asset = listServer.channel[parseInt(args[0])-1];
		// console.log(parseInt(args[0]))
		if(!radio_asset) return message.reply("can't find channel!").then(msg => msg.delete({timeout:5000}))
		// console.log(radio_asset);
		var video = {
			id : radio_asset.stream_id,
			url : radio_asset.uri,
			title : radio_asset.name
		};
		return client.players.handleVideo(client,video, msg, voiceChannel, false, type);
	}
}