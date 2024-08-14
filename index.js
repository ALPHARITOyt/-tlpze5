const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Its Life!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require('discord.js');
const client = new Discord.Client()


client.on('ready', () => {
    console.log('ready')
})

///حقوق زورو العم 

let guildid = '1267896567176626340'///اي دي السيرفر
let ordercommandchannel = '1271100505648660606'///اي دي روم الي تكتب فيها الامر
let ordermontagat = '1267896569471176865'///اي دي روم المنتجات
let ordertasamem = '1267896569471176865'
let linelink = 'https://cdn.discordapp.com/attachments/1267896571245101085/1268545952755748884/standard_21.gif?ex=66b60b7b&is=66b4b9fb&hm=5c98d29307601ce953e7eabdc8abe57eda9817561d43b4fe8e06d919a6f0b714&'///رابط الخط
let montagatmention = '<@&1271099107154333821>'///اي دي الرول لروم المنتجات
let tasamemmention = '<@&1271099107154333821>'///اي دي الرول لروم التصاميم
const prefix = '#'///حط اي برفكس تبي

client.on('message', async message => {
    
    if (message.channel.id === ordercommandchannel)
    if (message.guild.id === guildid) {
        message.delete({timeout: 8000})
    }
})

client.on('message', async message => {
   let args = message.content.slice(prefix.length).trim() .split(/ +/);

    let normals = message.guild.channels.cache.find(
        channel => channel.id === ordermontagat
    );
    let designssssss = message.guild.channels.cache.find(
        channel => channel.id === ordertasamem
    );
    if (message.content.startsWith(prefix + "طلب")) {
        if (message.channel.id != ordercommandchannel) return;
        const order = args.slice(1).join(" ");
        let newsd = new Discord.MessageEmbed()
        .setAuthor(message.author.username , message.author.displayAvatarURL({dynamic: true}))
        .addField(`طريقه الطلب :` , `\`\`\`${prefix}طلبك + طلب \`\`\``)
        .setTimestamp()
        .setFooter(message.guild.name , message.guild.iconURL({ dynamic: true }))

        if (!order) return message.reply(newsd)
        let nromalroom = new Discord.MessageEmbed()
            .setTitle(`**الطلب الجديد :**`)
            .setAuthor(
                `ID : ${message.author.id}`,
                message.author.displayAvatarURL({
                    dynamic: true
                })
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`**${order}**`)
        let ordernew = new Discord.MessageEmbed()
            .setTitle(`ما نوع طلبك ؟`)
            .setAuthor(
                `${message.author.username}`,
                message.author.displayAvatarURL({
                    dynamic: true
                })
            )
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`منتجات  : 🛒\n مثل نيترو وحسابات والخ \n تصميم : 🖌️ \n مثل بنر ولوقو والخ \n الغاء الطلب : ❌ \n لالغاء طلبك وعدم ارساله`)
        message.channel.send(ordernew).then(async m => {
            m.react("🛒")
            m.react("🖌️")
            m.react("❌")
            const filter = (reaction, user) => {
                return ['🛒', '🖌️','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(async collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '🛒') {
                        m.delete()
                        await message.reply(`** تم ارسال طلبك الى البائعين الرجاء الانتظار لـ يتواصل معك احد البائعين** `).then(mes => {
                            mes.delete({ timeout: 4000 })
                        })
                        await normals.send(`<@&${montagatmention}> \n صاحب الطلب : ${message.author}`)
                        await normals.send(nromalroom)
                        await normals.send(``)///رابط الخط
                    }
                    if (reaction.emoji.name === '🖌️') {
                        m.delete()
                        await message.reply(`** تم ارسال طلبك الى البائعين الرجاء الانتظار لـ يتواصل معك احد البائعين** `).then(mes => {
                            mes.delete({ timeout: 4000 })
                        })
                        await designssssss.send(`<@&${tasamemmention}> \n صاحب الطلب : ${message.author}`)
                        await designssssss.send(nromalroom)
                        await designssssss.send(``)///رابط الخط
                    }
                    if (reaction.emoji.name === '❌'){
                       m.delete()
                        message.delete()
                        await message.reply(`**تم الغاء طلبك بنجاح !** `).then(mes => {
                            mes.delete({ timeout: 4000 })
                        })
                    }
                })
        })
    }
})

client.login(process.env.token)