import { ApplicationCommandOptionType, EmbedBuilder, User, userMention, ChannelType, TextBasedChannel, TextBasedChannelMixin } from 'discord.js';
import { Command } from '../../structures/Command';
import docs from "../../config/unityDocs.json";

const choices = docs["Manual"].concat(docs["ScriptReference"]);

export default new Command({
    name: "docs",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "what you want to search for.",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: async (interaction, client) => {
        const focusedValue = interaction.options.getFocused();
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })).slice(0, 25),
		);
    },
    run: async ({ interaction }) => {
        const qeury = interaction.options.getString("qeury", true);

        if (docs["Manual"].filter(obj => obj == qeury).length == 1) {
            await interaction.followUp(`https://docs.unity3d.com/Manual/${qeury}.html`)
        }
        else if (docs["ScriptReference"].filter(obj => obj == qeury).length == 1) {
            await interaction.followUp(`https://docs.unity3d.com/ScriptReference/${qeury}.html`)
        }
        else {
            await interaction.followUp("Didn't find any thing related to your search.")
        }
    },
})