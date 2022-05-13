import TelegramApi from "node-telegram-bot-api";
import { gameOptions, againOptions } from "./options.js";

const token = "5379480787:AAFozwCRTLz_wF6isnsEMA4CsPRMGJ74Uww";

const bot = new TelegramApi(token, { polling: true });

const chats = [];

const startGame = async (chatId) => {
    await bot.sendMessage(
        chatId,
        `Now I will think of a number between 0 and 9, and you'll have to guess it!`
    );
    const randInt = Math.floor(Math.random() * 10);
    chats[chatId] = randInt;
    await bot.sendMessage(chatId, "Guess it!", gameOptions);
};

const start = () => {
    bot.setMyCommands([
        { command: "/start", description: "Starting hello" },
        { command: "/info", description: "Get user info" },
        { command: "/game", description: "Play a guessing game" },
    ]);

    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await bot.sendMessage(chatId, `Welcome to my tg bot`);
            return bot.sendSticker(
                chatId,
                "https://tlgrm.ru/_/stickers/504/bae/504bae9c-f76b-33b6-aac7-2c8dbc312a78/48.webp"
            );
        }

        if (text === "/info") {
            return bot.sendMessage(
                chatId,
                `Your name is ${msg.from.first_name} ${msg.from.last_name}`
            );
        }

        if (text === "/game") {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, "I didn't get it, try to use commands!");
    });

    bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === "/again") {
            return startGame(chatId);
        }
        if (data === String(chats[chatId])) {
            return await bot.sendMessage(
                chatId,
                `Congrats, You've guessed the number. Maybe you're the chosen one...`,
                againOptions
            );
        } else {
            return await bot.sendMessage(
                chatId,
                `Unfortunately, you didn't guess. The correct number was ${chats[chatId]}`,
                againOptions
            );
        }
    });
};

start();
