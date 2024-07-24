const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
process.env.TZ = 'Asia/Jakarta'
let fs = require('fs')
let path = require('path')
let osu = require('node-os-utils')
let { performance } = require('perf_hooks')
let fetch = require('node-fetch')
let canvafy = require ('canvafy')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};
let tags = {
  'start': 'S T A R T  B O T',
  'main': 'M A I N  M E N U',
  'sosmed': 'S O S M E D  M E N U',
  'ai': 'A I  A S S I S T A N T',
  'jadibot': 'J A D I B O T  M E N U',
  'stalking': 'S T A L K I N G  M E N U',
  'downloader': 'D O W N L O A D  M E N U',
  'sticker': 'S T I C K E R  M E N U',
  'advanced': 'A D V A N C E D  M E N U',
  'xp': 'E X P  M E N U',
  'fun': 'F U N  M E N U',
  'game': 'G A M E S  M E N U',
  'jadian': 'J A D I A N  M E N U',
  'group': 'G R O U P  M E N U',
  'vote': 'V O T E  M E N U',
  'catatan': 'C A T A T A N  M E N U',
  'absen': 'A B S E N  M E N U',
  'islami': 'I S L A M  M E N U',
  'maker': 'M A K E R  M E N U',
  'ephoto': 'M A K E R  E P H O T O  3 6 0',
  'textprome': 'M A K E R  T E X T P R O M E',
  'hd': 'I M A G E  H D',
  'convert': 'C O N V E R T  M E N U',
  'diffusion': 'D I F F U S I O N  M E N U',
  'panel': 'P A N E L  M E N U',
  'store': 'S T O R E  M E N U',
  'anonymous': 'A N O N Y M O U S  M E N U',
  'info': 'I N F O  M E N U',
  'internet': 'I N T E R N E T  M E N U',
  'quotes': 'Q U O T E S  M E N U',
  'audio': 'S O U N D  M E N U',
  'kerang': 'K E R A N G  M E N U',
  'owner': 'O W N E R  M E N U',
  'database': 'D A T A B A S E  M E N U',
  'anime': 'A N I M E  M E N U',
  'premium': 'P R E M I U M  M E N U',
  'bug': 'B U G  M E N U',
  'rpg': 'R P G  G A M E S  M E N U',
  'rpgabsen': 'R P G  A B S E N  M E N U',
  'nsfw': 'N S F W  M E N U',
  'asupan': 'A S U P A N  M E N U',
  'tools': 'T O L S  M E N U',
}
const defaultMenu = {
  before: `Hello, %tag 🪸\nI am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.\n\n◦ *Database* : Mongodb\n◦ *Library*  : ${module}\n
\n%readmore`.trimStart(),
  header: '┏ ┅〔 *%category* 〕┅',
  body: '┃❖ %cmd',
  footer: '┗ ┅ ━━★᭄ꦿ᭄ꦿ\n',
  after: '\n',
}
let handler = async (m, { conn, usedPrefix: _p }) => {
conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key }})
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let OS = osu.os.platform()
let os = `${OS}`
let name = await conn.getName(m.sender)
let ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(require('os').totalmem / 1024 / 1024)} MB`
let used = `${Object.entries(db.data.stats).length}`
let tag = `@${m.sender.split("@")[0]}`
let kata = [
'”Berhentilah untuk mencoba memperbaiki semuanya sendiri. Jangan lupa, kau tidaklah sendirian!”\n\n- *Ryuuji Suguro* -',
'”Jika satu kata tak cukup mengungkapkan perasaanmu, ungkapkanlah dengan semua kata-kata. Kalau kamu tidak bisa mempercayai kata-kata, ungkapkan dengan tindakan.”\n\n- *Shizuka Hiratsuka* -',
"”Kau harus mengambil semua tantangan jika itu dapat membuatmu berkembang.”\n\n- *Yukino Yukinoshita* -",
"”Orang-orang cerdas bersinar lebih terang dari orang biasa. Mereka tidak pernah menyesali atau tersiksa atas perbuatan mereka sendiri.”\n\n- *Archer* -",
"”Kalau kau terlalu bersinar, aku takkan bisa mendekatimu karena kau menyilaukan mataku.”\n\n- *Tanaka* -",
"”Cintaku seperti kilauan kembang api. Kilauan kecil yang perlahan meredup.Tapi, secercah cahaya kecil masih bersinar di hatiku.”\n\n- *Kazuko Hosogawa* -",
"”Kebaikan absolut itu lebih merepotkan daripada kejahatan.”\n\n- *Amatsuyu Kisaragi* -",
"”Dunia tidak akan menunggumu untuk mendapat keyakinan.”\n\n- *Hansung Yu* -",
"”Kesenangan takkan pernah bertahan lama. Begitulah Kehidupan”\n\n- *Rimuru Tempest* -",
"”Ketika kamu menyerah, saat itulah permainan berakhir”\n\n- *Mitsuyoshi Anzai* -",
'”Dunia tidak sempurna. Tapi itu ada untuk kita, lakukanlah yang terbaik... itulah yang membuatnya sangat indah.”\n\n- *Roy Mustang* -',
"“Sampai matipun aku akan mengejar cita-citaku.”.\n\n- *Uzumaki Naruto* -",
"“Aku pasti akan melakukan apa yang telah aku tetapkan.“\n\n- *Syaoran* -",
"“Dunia tidak sempurna. Tapi itu ada untuk kita, lakukanlah yang terbaik... itulah yang membuatnya sangat indah.“\n\n- *Roy Mustang* -",
"“Jika kamu tidak mengambil risiko, kamu tidak dapat menciptakan masa depan!“\n\n- *Monkey D.Luffy* -",
"”Apapun yang dapat kulakukan, akan kukerjakan!“\n\n- *Maihime Tenkawa* -",
"”Semua orang jika menginginkan sesuatu mereka terus bersabar, berusaha keras, belajar, dan menyemangati diri.“\n\n- *Satoru Fujinuma* -",
"”Mengikuti yang kuat adalah naluri makhluk lemah.“\n\n- *Demiurge* -",
"”Mungkin dunia kita terlalu sederhana sampai bisa diubah hanya dengan pernyataan cinta seseorang.“\n\n- *Rio Futaba* -",
"”Aku percaya padamu, Rem. Jadi aku ingin melakukan sesuatu agar kau bisa mempercayaiku.“\n\n- *Subaru Natsuki* -",
"”Tidak peduli apapun itu, kau tak boleh memperlakukan orang lain dengan buruk.“\n\n- *Keita Amano* -",
"”Prinsip kuhaku adalah menjadi nomor satu dalam permainan apapun.“\n\n- *Sora* -",
"”Kerinduan mencengkeram orang lebih kuat daripada racun, dan lebih dalam daripada penyakit.“\n\n- *Lyza* -",
"”Dunia ini mengagumkan. Orang-orang hidup dengan saling mencintai dan menghormati satu sama lain.“\n\n- *Photo* -",
"”Hal yang paling penting adalah melakukan apa yang ingin kau lakukan.“\n\n- *Rito Yuuki* -",
"”Mari kita bersaing secara sehat agar nantinya takkan ada penyesalan diantara kita.“\n\n- *Crusch Karsten* -",
"”Jika aku terlahir sepuluh tahun lebih awal, dan bertemu dengannya sepuluh tahun lebih awal, mungkin hatiku ini bisa dicuri olehnya.“\n\n- *Hachiman Hikigaya* -",
"”Sejarah adalah bukti bahwa manusia hidup. Bukti bahwa manusia hidup dengan batas kemampuan mereka.“\n\n- *Takahito Hida* -",
"”Lebih baik lakukan hal yang diinginkan daripada yang diharuskan!“\n\n- *Yuki Takeya* -",
"”Biarpun gagal..., bukankah lebih baik dari pada tidak melakukan apapun?“\n\n- *Enishi Shijima* -",
"”Jika kau memiliki kehormatan, (berarti) kau memiliki keberanian.“\n\n- *Meme Oshino* -",
"”Seseorang tidak akan berjuang sekeras itu jika dia tidak menyukainya.“\n\n- *Keiko Ayano* -",
"”Aku merasa kalau aku terus mengatakan (tentang impianku), itu benar-benar akan terwujud.“\n\n- *Airi Katagiri* -",
"”Persahabatan itu adalah tempat saling berbagi rasa sakit.“\n\n- *Megumin* -",
"”Meskipun cahaya kembang api akan menghilang, tapi kenangannya akan terus terjaga.“\n\n- *Chizuru Hishiro* -",
"”Sudah sejak lama aku selalu melihatmu. Ini bukan lelucon, aku serius. Tak ada hal lain yang kupikirkan selain dirimu.“\n\n- *Keima Katsuragi* -",
"”Tidak apa-apa kamu tak mencintaiku. Tapi biarkan aku mencintaimu.“\n\n- *Touko Nanami* -",
"”Menyumbunyikan semua usaha dari orang lain bukan sesuatu yang bisa dilakukan semua orang.“\n\n- *Oota* -",
"”Aku sendiri tahu apa yang ku lakukan ini bodoh (membantu orang yang sedang dikeroyok).Tapi itulah yang membedakan manusia dengan hewan.“\n\n- *Shinichi Izumi* -",
"”Hanya seseorang yang bisa memahami dirinya sendirilah yang dapat terus menerus membuat kemajuan.“\n\n- *Masachika Kouda* -",
"”Bagiku, senyum Emilia-tan adalah bintang yang bersinar paling terang di langit malam.“\n\n- *Subaru Natsuki* -",
"”Kunjunganmu merupakan obat terbaik yang dia miliki.“\n\n- *Ume Sawa* -",
"”Di dunia ini ada banyak hal yang takkan berubah meski kita memikirkannya.“\n\n- *Ichiko Rokujou* -",
"”Memakai alasan untuk lari akan membuatmu terlihat menyedihkan.“\n\n- *Hikari Takanashi* -",
"”Aku harus membuang segalanya kecuali tujuanku.“\n\n- *Togame* -",
"”Aku ingin menikmati hubungan asmara ini, bukan hasilnya.“\n\n- *Mari Shiina* -",
"”Setiap kali kau mendapatkan satu hal yang kau inginkan, kau (juga) akan kehilangan satu hal yang kau inginkan.“\n\n- *Francis Scott Key Fitzgerald* -",
"”Aku sangat menyukai kerendahan hatimu yang bahkan tak kausadari telah menjadi daya tarikmu.“\n\n- *Neko Fujinomiya* -",
"”Jangan asal ambil keputusan penting yang bisa mengubah arah hidupmu hanya karena dirimu mengantuk atau bosan.“\n\n- *Tomoya Aki* -",
"”Jangan terlalu memaksakan diri, istirahatlah dulu.Menjaga kesehatan itu juga bagian dari pekerjaan.“\n\n- *Ibu Mikage* -",
"”Deru ombak adalah lagu pengantar tidur terbaik.“\n\n- *Kaguya Shinomiya* -",
"”Aku iri pada orang-orang yang punya impian dan bersemangat mewujudkannya.“\n\n- *Yuugo Hachiken* -",
"”Orang-orang cerdas bersinar lebih terang dari orang biasa. Mereka tidak pernah menyesali atau tersiksa atas perbuatan mereka sendiri.“\n\n- *Archer* -",
"”Kalau kau tidak memperhatikan hal di sekitarmu, kau akan melewatkan hal-hal yang penting.“\n\n- *Haruta Kamijou* -",
]
let quotes = `${pickRandom(kata)}`
const fcon = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `${name}`,}}}
conn.sendPresenceUpdate("composing", m.chat)
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    const wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    const wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    const wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let wibh = moment.tz('Asia/Jakarta').format('HH') 
      let wibm = moment.tz('Asia/Jakarta').format('mm') 
      let wibs = moment.tz('Asia/Jakarta').format('ss') 
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' }) 
    let date = new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Jakarta'})
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let hour_now = moment.tz('Asia/Jakarta').format('HH')
    let ucapanWaktu;
    if (hour_now >= '03' && hour_now <= '10') {
    ucapanWaktu = 'Pagi'
    } else if (hour_now >= '10' && hour_now <= '15') {
    ucapanWaktu = 'Siang'
    } else if (hour_now >= '15' && hour_now <= '17') {
    ucapanWaktu = 'Sore'
    } else if (hour_now >= '17' && hour_now <= '18') {
    ucapanWaktu = 'Petang'
    } else if (hour_now >= '18' && hour_now <= '23') {
    ucapanWaktu = 'Malam'
    } else {
    ucapanWaktu = 'Malam'
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1af7bf38b483aa4266eed.jpg");
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: package.name,
      npmdesc: package.description,
      module: package.module,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, wib, wit, wita, time, tag, ram, quotes, os, used, uptime, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let p = await new canvafy.Security()
.setAvatar(pp)
.setBackground("image", "https://telegra.ph/file/cad7038fe82e47f79c609.jpg")
.setCreatedTimestamp(Date.now())
.setSuspectTimestamp(1)
.setBorder("#f0f0f0")
.setLocale("id") // country short code - default "en"
.setAvatarBorder("#f0f0f0")
.setOverlayOpacity(0.9)
.build();
await conn.sendFile(m.chat, p, '', Styles(text), m, null, {
  fileLength: '450000000000000000',
  contextInfo: {
   mentionedJid: [m.sender],
    externalAdReply: {
     showAdAttribution: true,
      mediaType: 1,
      description: wm,
      title: `TwinStar (WhatsApp Bot)`,
      renderLargerThumbnail: true,
      thumbnailUrl: pp,
      sourceUrl: sgc
    }
  }
})
await conn.sendMessage(m.chat, { audio: { url: './mp3/kemii.mp3' }, viewOnce: true, seconds: fsizedoc, ptt: true, mimetype: "audio/mpeg", fileName: "bot.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
        //await conn.sendFile(m.chat, kemii, '', '', m, true)
//Sazumi Kemii
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['help']
handler.tags = ['main']
handler.command = /^(menuall|allmenu)$/i
handler.register = true;
handler.limit = true;

module.exports = handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}