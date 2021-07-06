module.exports.run = async (bot, interaction, res, attach, args) => {
    res.post({
        data: {
            type: 4,
            data: {
                flags: 64,  //with this only the user who executed the command will see the response. delete this line for make it visible to everyone
                content: "Hello!"
            }
        }
    })
}
