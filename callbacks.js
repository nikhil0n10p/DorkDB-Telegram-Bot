const Dork = require('./models/dork');

module.exports = function handleCallbacks(bot) {
    bot.on('callback_query', (callbackQuery) => {
        const action = callbackQuery.data.split('_')[0];
        const dorkId = callbackQuery.data.split('_')[1];
    
        if (action === 'approve') {
            Dork.updateOne({ _id: dorkId }, { approved: true }).then(() => {
                bot.answerCallbackQuery(callbackQuery.id, { text: "Dork approved." });
            }).catch(err => {
                console.error(err);
                bot.sendMessage(callbackQuery.message.chat.id, "An error occurred during dork approval.");
            });
        } else if (action === 'reject') {
            Dork.deleteOne({ _id: dorkId }).then(() => {
                bot.answerCallbackQuery(callbackQuery.id, { text: "Dork rejected and deleted." });
            }).catch(err => {
                console.error(err);
                bot.sendMessage(callbackQuery.message.chat.id, "An error occurred while deleting the dork.");
            });
        }
    });
};
