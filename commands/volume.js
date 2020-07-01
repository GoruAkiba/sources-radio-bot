module.exports = {
	name : "volume",
	description: "change player volume",
	aliases : ["vol","v"],
	ussage : "[ Number 0 - 100 ]",
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message,args){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);

		if (!msg.member.voice.channel) return msg.channel.send("I'm sorry but you need to be in a voice channel to play music!");
		if(!client.voice.connections.has(msg.member.voice.channel.id)) return message.reply("dont disturb me!")
		if (!serverQueue) return msg.channel.send("There is nothing playing.");
		if (!args[1]) return msg.channel.send(`The current volume is: **\`${serverQueue.volume}%\`**`);
		if (isNaN(args[1]) || args[1] > 100) return msg.channel.send("Volume only can be set in range **1** - **100**.");
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolume(args[1] / 100);
		return msg.channel.send(`I set the volume to: **\`${args[1]}%\`**`);
	}
}