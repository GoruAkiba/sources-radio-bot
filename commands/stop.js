module.exports = {
	name : "stop",
	description: "stop nowplaying audio",
	aliases : ["st"],
	ussage : null,
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
		if (!serverQueue) return msg.channel.send("There is nothing playing that I could **\`stop\`** for you.");
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end("Stop command has been used!");
		return msg.channel.send("⏹️  **|**  Stop command has been used!");
	}
}