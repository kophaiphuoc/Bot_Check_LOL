const prefix = process.env.PREFIX
const { getDataChampion } = require('../Services/InForChampion')
const { EmbedBuilder } = require('discord.js');

const InforUser = {
    CheckInforChampion: () => {
        return {
            name: `${prefix} i4`,
            description: 'Ping command',
            execute: async (message, args, userName) => {
                const checkUser = await getDataChampion.searchUser(userName);
                const topChampion = await getDataChampion.topChampion(checkUser.id)
                console.log(topChampion)
                if (checkUser == 2) {
                    const embed = new EmbedBuilder()
                        .setTitle('Người chơi không tồn tại')
                        .setThumbnail('https://cdn-icons-png.flaticon.com/128/2828/2828914.png')
                        .setTimestamp(Date.now())
                    await message.reply({ embeds: [embed] });
                } else {
                    const domainUrl = 'https://lmssplus.com/static_image/img/profileicon/'
                    const embed = new EmbedBuilder()
                        .setTitle('Thông tin người chơi')
                        .setThumbnail('https://64.media.tumblr.com/71c80996a06521f9f28c10ab08e06cb1/2cb1d757f11a0977-33/s500x750/a9641ba250bf355ce97352e2d4524d8d8c62bfb4.jpg')
                        .setAuthor({
                            url: 'https://www.facebook.com/profile.php?id=100010536793723',
                            iconURL: domainUrl + checkUser.profileIcon,
                            name: checkUser.name
                        })
                        .setTimestamp(Date.now())
                        .addFields(
                            {
                                name: 'ID',
                                value: checkUser.id + '',
                            },
                            {
                                name: 'Tên',
                                value: checkUser.name + '',
                            },
                            {
                                name: 'Cấp độ',
                                value: checkUser.level + '',
                            },
                            {
                                name: 'PUUID',
                                value: checkUser.puuid + '',
                            },
                            {
                                name: 'Summoner ID',
                                value: checkUser.summonerId + '',
                            },
                        );
                    await message.reply({ embeds: [embed] });
                }
            }
        }
    },
    CheckInforChampion2: (userName) => {
        return {
            name: `i4 ${userName}`,
            description: 'Ping command',
            execute: (message, args) => {
                message.reply(`i4 ${userName}`)
            }
        }
    }
};

module.exports = InforUser