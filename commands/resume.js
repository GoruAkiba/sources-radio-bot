module.exports = {
	name : "resume",
	description: "resume current Audio!",
	aliases : ["resum","rs"],
	ussage : null,
	hidden : false,
	canDisabled : true,
	admin : false,
	owner : false,
	nsfw : false,
	async execute(client,message,args){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);

		if (serverQueue && !serverQueue.playing) {
				serverQueue.playing = true;
				serverQueue.connection.dispatcher.resume();
				return msg.channel.send("▶  **|**  Resumed the music for you!");
		}
		return msg.channel.send("There is nothing playing.");
	}
}