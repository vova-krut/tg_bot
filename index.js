import TelegramApi from "node-telegram-bot-api";

const token = "5379480787:AAFozwCRTLz_wF6isnsEMA4CsPRMGJ74Uww";

const bot = new TelegramApi(token, { polling: true });
