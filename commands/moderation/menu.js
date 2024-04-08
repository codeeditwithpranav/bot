const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('about all command in this bot'),
    async execute(interaction) {
        const select = new StringSelectMenuBuilder()
            .setCustomId('option')
            .setPlaceholder('select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('mod-commands')
                    .setDescription('there are four moderation commands.')
                    .setValue('mod-commands'),
            )

        const row1 = new ActionRowBuilder()
            .addComponents(select);

        await interaction.reply({
            content: 'Choose your starter!',
            components: [row1],
        });
        const filter = i => i.customId === 'option' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            const val = i.values[0]
            if (val === 'mod-commands') {
                const embed = new EmbedBuilder()
                    .setTitle('Moderation Commands')
                    .addFields(
                        { name: '/ban', value: 'ban a member' },
                        { name: '/kick', value: 'kick a member' },
                        { name: '/mute', value: 'mute a member' },
                        { name: '/time_out', value: 'time_out a member' }
                    )
                    .setColor(0x0099FF)
                    .setTimestamp()
                    .setFooter({ text: 'is this helpfull', iconURL: 'https://t3.ftcdn.net/jpg/03/99/53/44/360_F_399534445_zG1tMcAn0q7bCaPw2Lp5ZWiBiBgQYxvN.jpg' });

                await i.update({ content: 'Here are the moderation commands:', embeds: [embed] });
            }
        });

        collector.on('end', async collected => {
            await interaction.editReply({ content: 'Interaction ended.' });
        });

    }
}