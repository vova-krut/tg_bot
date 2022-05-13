import TelegramApi from "node-telegram-bot-api";

const token = "5379480787:AAFozwCRTLz_wF6isnsEMA4CsPRMGJ74Uww";

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "Starting hello" },
    { command: "/info", description: "Get user info" },
]);

bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
        await bot.sendMessage(chatId, `Welcome to my tg bot`);
        await bot.sendSticker(
            chatId,
            "https://tlgrm.ru/_/stickers/504/bae/504bae9c-f76b-33b6-aac7-2c8dbc312a78/48.webp"
        );
    }

    if (text === "/info") {
        await bot.sendMessage(
            chatId,
            `Your name is ${msg.from.first_name} ${msg.from.last_name}`
        );
    }
});
