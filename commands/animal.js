const discord = require("discord.js")

module.exports.run = async (bot, interaction, res, attach, args) => {
    const animal = args.find(a => a.name.toLowerCase() == "animal").value  //this will find what the user selected. animal is the name of the option, not the command
    
    let phrase;

    if(animal == "cat") {  //you need to check the value, not the name
        phrase = "Meow!"
    }
    if(animal == "dog") {
        phrase == "Woff woff!"
    }

    const embed = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(interaction.member.user.username + "'s favourite animal")
    .setDescription("He/she loves " + animal + ". " + phrase)

    res.post({
        data: {
            type: 4,  //type 4 is a normal message/embed, for see every type read the discord slash commands documentation
            data: attach(interaction, embed)
        }
    })
}
