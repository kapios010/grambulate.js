import "dotenv/config"
import { ChatInputCommandInteraction, Client, EmbedBuilder, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { grambulatePlus, grambulateMinus } from 'grambulate.js'
import { toSubstring } from "./subscript.js";
import { Vector2D } from "grambulate.js/vector2d";

const client = new Client({ intents: [] });

const commands = ['grambulate_plus', 'grambulate_minus']

client.once(Events.ClientReady, () => {
    console.log('Up an runnin')
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return

    const command = await interaction.client.application.commands.fetch(interaction.commandId)

	if (!command || !commands.includes(command.name)) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	switch(commands.indexOf(command.name)) {
		case 0:
			await gPlusCmd(interaction)
			break
		case 1:
			await gMinusCmd(interaction)
			break
	}
})


async function gPlusCmd(interaction: ChatInputCommandInteraction) {
	const calculatingEmbed = new EmbedBuilder()
	.setColor('DarkBlue')
	.setTitle("Grambulating...")
	const msg = await interaction.reply({ embeds: [ calculatingEmbed ]})
	try {
		const inA = interaction.options.getInteger('input_a')
		const inB = interaction.options.getInteger('input_b')
		const deg = interaction.options.getInteger('degree') ?? null
		let degStr = ""
		if(deg != null && deg != 1)
			degStr = toSubstring(deg)
		const res = grambulatePlus(inA!, inB!, deg ?? undefined)
		const successEmbed = new EmbedBuilder()
		.setColor('DarkGreen')
		.setTitle(`${inA} ◊${degStr} ${inB} = ${res}`)
		await msg.edit({ embeds: [successEmbed]})
	} catch(err) {
		const errorEmbed = new EmbedBuilder()
		.setColor('DarkRed')
		.setTitle(String(err))
		await msg.edit({ embeds: [ errorEmbed ]})
	}
}

async function gMinusCmd(interaction: ChatInputCommandInteraction) {
	const calculatingEmbed = new EmbedBuilder()
	.setColor('DarkBlue')
	.setTitle("Grambulating...")
	const msg = await interaction.reply({ embeds: [ calculatingEmbed ]})
	try {
		const inA = interaction.options.getInteger('input_a')
		const inB = interaction.options.getInteger('input_b')
		const deg = interaction.options.getInteger('degree') ?? null
		let degStr = ""
		if(deg != null && deg != -1)
			degStr = toSubstring(deg)
		const res = grambulateMinus(inA!, inB!, deg ?? undefined)
		const successEmbed = new EmbedBuilder()
		.setColor('DarkGreen')
		.setTitle(`${inA} ⧫${degStr} ${inB} = ${res}`)
		await msg.edit({ embeds: [successEmbed]})
	} catch(err) {
		const errorEmbed = new EmbedBuilder()
		.setColor('DarkRed')
		.setTitle(String(err))
		await msg.edit({ embeds: [ errorEmbed ]})
	}
}

client.login(process.env.TOKEN)