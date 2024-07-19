const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU4xNk1oSHNYaW5vZm1aVGdCL3A0TE54c1JrNnk0aTczMzRxVC94cEszdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0RsTTlmVGs3TU5iL1BXWlMrekZuQzBHMnRCZHovVS9FdElKWUd5ZnUyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3R2lub1hrZ0NKMnBuQzNoUjBCeWZEYWdyUzZTbVI3UENjZEFwN3RLQzBvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwWnBGWFgxUzJpY2F1Rlk4QXZDakNQREh3SVlNalozdXRVOEp6c25mUjNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNBSDU1QVFlMzZxcmFsdXQydnY5Z01vV3dTSVpORmdjWUhJejRmekJXVzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM0bkQyQ1BKK2wxWWVTa1VmT0R4a2FJd2NQYUF4b2NlTlhyTjk2SXZFQnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUNpcGlabjc2Tjd6MEJENHBBbFlRV0R4dGR6a3FETnMvbGgwN0FGditrcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTZDY0VPbUl2UHFZTFhzYTVmU2Nmc3cxeUorZHNHN0pRMG9rODJ0cEYzaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh3NVBrYWJ2RE1tamJURnplSFRjZEFHeFZyMnlTOGVZclZTZU5ydWZRTERGcG5nYStjbXBxa1hGV0RlRXNMdlBJK29VbEZmMkUzVzJreFIwSllCREJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI0LCJhZHZTZWNyZXRLZXkiOiJkZ1JzR0ZOSFVkazdUZmc1YXRid3ZYLys5OHZxSEZHL3hpRnkrOGxCTnJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJhSExUc0pjYVMtR19YdWFpbENkOTlBIiwicGhvbmVJZCI6ImE0ZDI1NTczLTk2N2QtNDVhOC05Y2ZkLWJhN2ExYWUyZDc5ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSS9QOTZiV0kramRKZGMrTHV3VVVsYlBxSWc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2NuQkVITi9pdmJkZ0V6d1pIWUwvN3FWVWI0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxHSk5WVjhWIiwibWUiOnsiaWQiOiI5MjM0NzIyMDczOTk6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4LyE4bacyrPhtYPhtrvKuPCdmbHwnZm+8J2aiCDgv5BcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxu5LqXIPCdkIDwnZCM8J2QhPCdkITwnZCRIPCdkIzwnZCU8J2QgPCdkJbwnZCI8J2QmPCdkIAg5LqXIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMeWl0c0lIRU4zNDZMUUdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDdXdoK2VOQzU0WSt5NDMySWNyWEFuVkQweGRxVjlwNmdQbTE0TlBWNmdNPSIsImFjY291bnRTaWduYXR1cmUiOiJqaHA2TFBoY0pCV0p5YnJEdGNTT25lMEVyL1RYSldic2g5OHhSOFd4b2lQRVZrb05XRkc2QXh0d1pESFk0RkpRdURHWUZ1S2xENHBDODVLcktYWnJCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSFpZam0zWlFCdEhWeTVveFRRUGhheWcrT1liYm82V3hXTTNwYnZDRmY0b3EweFRyeGtlSkRrKzBhYlVycENUQWdxRytyaXNicW41TDFVRGZCQ0U3QUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0NzIyMDczOTk6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXJzSWZualF1ZUdQc3VOOWlISzF3SjFROU1YYWxmYWVvRDV0ZURUMWVvRCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTM4NDA0MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPNUsifQ==',
    PREFIXE: process.env.PREFIX || "~",
    OWNER_NAME: process.env.OWNER_NAME || "𝐀𝐌𝐄𝐄𝐑-𝐌𝐔𝐀𝐖𝐈𝐘𝐀",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923472207399",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝐀𝐌𝐄𝐄𝐑-𝐌𝐔𝐀𝐖𝐈𝐘𝐀',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/Cb81NxN/251.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '4' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
