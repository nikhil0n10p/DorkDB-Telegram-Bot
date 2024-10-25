const Dork = require('./models/dork');

module.exports = function handleMessages(bot) {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        
        if (msg.text === "➕ Add Dork") {
            bot.sendMessage(chatId, "Please enter the dork:");
        
            bot.once('message', (msgDork) => {
                const dork = msgDork.text.trim();
                const dorkKeywords = [
                    'inurl:', 'intitle:', 'intext:', 'filetype:',
                    'site:', 'link:', 'cache:', 'related:',
                    'allinurl:', 'allintitle:', 'allintext:',
                    'allinanchor:', 'inanchor:', 'define:',
                    'info:', 'source:', 'book:', 'movie:',
                    'music:', 'author:', 'email:', 'phone:'
                ];
        
                const hasKeyword = dorkKeywords.some(keyword => dork.startsWith(keyword));
                if (!hasKeyword) {
                    return bot.sendMessage(chatId, "A dork must start with a valid keyword. Please use a keyword such as inurl:, intitle:, intext:, or filetype:");
                }
        
                Dork.find().then(existingDorks => {
                    const isExistingExact = existingDorks.some(existing => existing.dork === dork);

                    const isExistingSimilar = existingDorks.some(existing => {
                        const existingKeywords = existing.dork.split(" ");
                        const newDorkKeywords = dork.split(" ");

                        const existingKeywordSet = new Set(existingKeywords);
                        const newDorkKeywordSet = new Set(newDorkKeywords);

                        return [...newDorkKeywordSet].every(keyword => existingKeywordSet.has(keyword));
                    });

                    if (isExistingExact) {
                        return bot.sendMessage(chatId, "This dork already exists.");
                    }

                    if (isExistingSimilar) {
                        return bot.sendMessage(chatId, "This dork is similar to an existing dork.");
                    }

                    bot.sendMessage(chatId, "Please select a category:", {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "SQL Dork", callback_data: "SQL" }],
                                [{ text: "WP Dork", callback_data: "WP" }],
                                [{ text: "Directory List Dork", callback_data: "DL" }]
                            ]
                        }
                    });

                    bot.once('callback_query', (callbackQuery) => {
                        const category = callbackQuery.data;
                        const addedBy = msg.from.username || "Anonymous";

                        const newDorkEntry = new Dork({ category, dork, addedBy });
                        newDorkEntry.save()
                            .then(() => {
                                bot.sendMessage("NOTIFICATION_CHANNEL_ID", `Yeni dork eklendi:\nDork: ${dork}\nKategori: ${category}\nEkleyen: ${addedBy}`);
                                bot.sendMessage(chatId, "Dork successfully added and sent for approval.");
                            })
                            .catch(err => {
                                console.error(err);
                                bot.sendMessage(chatId, "There was an error adding the dork.");
                            });
                    });
                })
                .catch(err => {
                    console.error(err);
                    bot.sendMessage(chatId, "There was an error processing your request.");
                });
            });
        }

        if (msg.text === "🏆 Top List") {
            Dork.aggregate([
                { $match: { approved: true } },
                { $group: { _id: "$addedBy", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])
            .then(results => {
                if (results.length === 0) {
                    return bot.sendMessage(chatId, "No dork has been added yet.");
                }
        
                let response = "";
                results.forEach((user, index) => {
                    response += `*${index + 1}.* \`${user._id}\`: ${user.count} Dork\n`;
                });
        
                bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
            })
            .catch(err => {
                console.error(err);
                bot.sendMessage(chatId, "An error occurred while creating the toplist.");
            });
        }
    
        if (msg.text === "🗄 Generate SQL Dork") {
            Dork.aggregate([{ $match: { approved: true, category: 'SQL' } }, { $sample: { size: 1 } }])
                .then(result => {
                    if (result.length === 0) {
                        return bot.sendMessage(chatId, "No approved SQL Dork found.");
                    }
    
                    const randomDork = result[0];
                    bot.sendMessage(chatId, `\`${randomDork.dork}\``, { parse_mode: 'Markdown' });
                })
                .catch(err => {
                    console.error(err);
                    bot.sendMessage(chatId, "An error occurred while generating the dork.");
                });
        }
    
        if (msg.text === "📋 Generate WP Dork") {
            Dork.aggregate([{ $match: { approved: true, category: 'WP' } }, { $sample: { size: 1 } }])
                .then(result => {
                    if (result.length === 0) {
                        return bot.sendMessage(chatId, "No approved WP Dork found.");
                    }
    
                    const randomDork = result[0];
                    bot.sendMessage(chatId, `\`${randomDork.dork}\``, { parse_mode: 'Markdown' });
                })
                .catch(err => {
                    console.error(err);
                    bot.sendMessage(chatId, "An error occurred while generating the dork.");
                });
        }

        if (msg.text === "🗂 Generate Directory List Dork") {
            Dork.aggregate([{ $match: { approved: true, category: 'DL' } }, { $sample: { size: 1 } }])
                .then(result => {
                    if (result.length === 0) {
                        return bot.sendMessage(chatId, "No approved Directory List Dork found.");
                    }
    
                    const randomDork = result[0];
                    bot.sendMessage(chatId, `\`${randomDork.dork}\``, { parse_mode: 'Markdown' });
                })
                .catch(err => {
                    console.error(err);
                    bot.sendMessage(chatId, "An error occurred while generating the dork.");
                });
        }
    });
};
