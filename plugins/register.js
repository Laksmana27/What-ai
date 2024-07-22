let fetch = require('node-fetch')
let handler = async function (m, { conn, args, usedPrefix, command }) {
      let users = global.db.data.users[m.sender]
      let name = await conn.getName(m.sender)
      if (users.registered === true) return conn.reply(m.chat, '```🐱 Nomor Kamu Udah Terverifikasi```', m)
      if (!args || !args[0]) return conn.reply(m.chat, `• *Example :* .${command} ${global.email}`, m)
      await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})     
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return conn.reply(m.chat, '```🐱 Email Tidak Ada, Harap Gunakan Email Asli !```', m)
      let code = `${getRandomInt(100, 900)}-${getRandomInt(100, 900)}`
      let kemii = conn.user.jid.split("@")[0]
      users.codeExpire = new Date * 1
      users.code = code
      users.email = args[0]
        await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": `${global.wm}`
                    },
                    "to": [{
                        "email": args[0],
                        "name": `${name}`
                    }],
                    "subject": "Email Verification",
                    "html": `<div style="padding:20px;border:1px dashed #222;font-size:15px"><tt>Halo <b>${name} 👋🏻</b><br><br>Konfirmasi Emailmu Supaya Dapat Menggunakan Fitur Bot, Kirim Angka Dibawah Ini Ke Nomor ${global.wm}, Angka Hanya Berlaku 3 Menit.<br><center><h1>${code}</h1></center>atau Kamu Bisa Langsung Ke wa Bot Dengan Cara Mengklik Link Dibawah : <a href="https://wa.me/${kemii}?text=${code}">https://wa.me/${kemii}?text=${code}</a><br><br><hr style="border:0px; border-top:1px dashed #222"><br>Regards, <b>Laksmana27</b></tt></div>`,
                    "category": "Notification"
                })
            })
            .then(response => response.json())
         return conn.reply(m.sender, '```Kode Sudah Terkirim \nCek Email Untuk Melanjutkan Verifikasi!```', m)
    }
handler.help = ['reg *<email>*']
handler.tags = ['start']

handler.command = /^(reg|regmail|daftar|register|mendaftar)$/i
handler.private = false

module.exports = handler

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}