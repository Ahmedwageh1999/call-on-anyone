const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType, Interaction, PermissionsBitField } = require("discord.js")
const Enmap = require("enmap")
const db1 = new Enmap({
    name: 'ahmed',
    dataDir: './node_modules/enmap'

})
module.exports = {
    name: 'come',
    description: 'Call on someone 📣',
    options: [
        {
            name: 'message',
            description: 'Write a message to be sent to a user ',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'user',
            description: 'Choose the user that will be sent to him a message',
            type: ApplicationCommandOptionType.User,
            required:true
        },
        {
            name: 'channel',
            description: 'Choose a channel that you want the user to come to it',
            type: ApplicationCommandOptionType.Channel,
            required:true
        },


    ],

    run: async (client, interaction) => {

        const message = interaction.options.getString("message")
        

user = interaction.member
        

db1.ensure("bergo" ,
    {
        Message : []
    }
)

db1.set("bergo" , message , "Message")

const button = new ActionRowBuilder ()
.addComponents (
    new ButtonBuilder ()
    .setCustomId ("test")
    .setLabel("click to send")
    .setEmoji("🧻")
    .setStyle(ButtonStyle.Danger)

)
const msg = await interaction.reply({content: `**<@${interaction.user.id}>  Click on button 🧻 to send to user Dm **` , embeds : [new EmbedBuilder ().setDescription (`**This is your Dm message => \n ${db1.get("bergo" , "Message")} **`)] , components : [button] , ephemeral : true})

const collector = msg.createMessageComponentCollector ()
collector.on("collect" , async i => {
    if (i.customId === "test"){
        const user = interaction.options.getUser ("user")
      const member = interaction.member;
       
        const channel = interaction.options.getChannel("channel")
        
        user.send({content : `<@${member.id}> ` , embeds : [new EmbedBuilder () .setColor ("Random") .setDescription (`**${message}**`).setTitle(`${interaction.member}`)]})

        
        return await i.update({content : `**<@${interaction.user.id}> Done The Dm sent successfully ✅**` , embeds : [new EmbedBuilder () .setDescription(` \`\ ${db1.get("bergo" , "Message")} \`\ `)], components : []})
       
    }



})



    }
}