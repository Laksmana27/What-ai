let axios = require('axios')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .ai hello', m)
  let kemii = await conn.reply(m.chat, '```Loading...```', m)
  let hasil = await generate(text)
  await conn.sendMessage(m.chat, { text: `${hasil.reply}`.trim(), edit: kemii })
}
handler.command = /^ai$/i
handler.help = ['ai *<text>*']
handler.tags = ['tools','ai']
handler.register = false
handler.limit = true

module.exports = handler

async function generate(q) {
    try {
        const {
            data
        } = await axios(
            `https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
                method: "post",
                data: {
                    botId: "default",
                    newMessage: q,
                    stream: false,
                },
                headers: {
                    Accept: "text/event-stream",
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (err) {
        console.log(err.response.data);
        return err.response.data.message;
    }
}