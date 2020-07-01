module.exports = {
	name : "pause",
	description: "pause current Audio!",
	aliases : ["ps"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message,args){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);

		if (serverQueue && serverQueue.playing) {
				serverQueue.playing = false;
				serverQueue.connection.dispatcher.pause();
				return msg.channel.send("⏸  **|**  Paused the music for you!");
		}
		return msg.channel.send("There is nothing playing.");
	}
}