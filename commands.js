const Settings = require('./models/settings');
const Dork = require('./models/dork');
const adminId = ADMIN_ID;

module.exports = function handleCommands(bot) {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        Settings.findOne().then(settings => {
            if (settings.maintenance && chatId !== adminId) {
                return bot.sendMessage(chatId, "Currently, the bot is under maintenance. Please try again later.");
            }

            const username = msg.from.username || "User";
            bot.sendMessage(chatId, `👋 Welcome \`${username}\`!`, {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        [{ text: "🗄 Generate SQL Dork" }, { text: "📋 Generate WP Dork" }],
                        [{ text: "🗂 Generate Directory List Dork" }],
                        [{ text: "🏆 Top List" }],
                        [{ text: "➕ Add Dork" }]
                    ],
                    one_time_keyboard: false,
                    resize_keyboard: true
                }
            });
        });
    });

    bot.onText(/\/bakım/, (msg) => {
        const chatId = msg.chat.id;
        if (chatId !== adminId) {
            return bot.sendMessage(chatId, "Only admin can use this command.");
        }
        Settings.findOne().then(settings => {
            settings.maintenance = !settings.maintenance;
            settings.save().then(() => {
                bot.sendMessage(chatId, `Maintenance mode is now ${settings.maintenance ? 'ON' : 'OFF'}.`);
            });
        });
    });

    bot.onText(/\/do/, (msg) => {
        const chatId = msg.chat.id;
        
        if (chatId !== adminId) {
            return bot.sendMessage(chatId, "Only admin can use this command.");
        }

        Dork.findOne({ approved: false }).sort({ _id: 1 }).then(dork => {
            if (!dork) {
                return bot.sendMessage(chatId, "No pending dork found.");
            }

            const dorkMessage = `Dork: ${dork.dork}\nCategory: ${dork.category}`;
            bot.sendMessage(chatId, dorkMessage, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "Approve", callback_data: `approve_${dork._id}` },
                            { text: "Reject", callback_data: `reject_${dork._id}` }
                        ]
                    ]
                }
            });
        }).catch(err => {
            console.error(err);
            bot.sendMessage(chatId, "An error occurred during dork approval.");
        });
    });
};