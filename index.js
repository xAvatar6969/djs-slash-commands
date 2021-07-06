const discord = require("discord.js")

const bot = new discord.Client()

bot.on("ready", () => {
    const cmd = bot.api.applications(bot.user.id).commands  //semplificate your life with this

    cmd.post({  //let's globally post the command
        data: {
            name: "animal",
            description: "Tells everybody what's your favourite animal",
            options: [  //optional
                {
                    name: "animal",
                    description: "Select your favourite animal",
                    type: 3,  //type 3 is string, for see every type read the discord slash commands documentation
                    required: true,
                    choices: [
                        {
                            name: "Cat",  //this is the name that the user will see
                            value: "cat",  //this is the "technical" name of the option
                        },
                        {
                            name: "Dog",
                            value: "dog"
                        }
                    ]
                }
            ]
        }
    })

    cmd.post({
        data: {
            name: "hello",
            description: "Says hello to you"
        }
    })

})


bot.ws.on("INTERACTION_CREATE", async interaction => {
    const args = interaction.data.options
    const command = interaction.data.name.toLowerCase()
    const res = bot.api.interactions(interaction.id, interaction.token).callback  //semplificate you life with this (part 2 xD)
    
    const cmdfile = require(`./commands/${command}.js`)
    cmdfile.run(bot, interaction, res, attach, args).catch(err => console.error(err))
})



async function attach(interaction, content) {  //this function is for attach files and embeds
    const apiMessage = await discord.APIMessage.create(bot.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}


bot.login("token")
