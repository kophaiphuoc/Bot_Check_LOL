const prefix = process.env.PREFIX
const { getDataChampion } = require('../Services/InForChampion')
const { libraryChampion } = require('../utils/ModelChampion')
const { EmbedBuilder } = require('discord.js');

const InforUser = {
    CheckInforChampion: () => {
        return {
            name: `${prefix} i4`,
            description: 'Ping command',
            execute: async (message, args, userName) => {
                const checkUser = await getDataChampion.searchUser(userName);
                const topChampion = await getDataChampion.topChampion(checkUser.id)
                const arrChampion = topChampion?.masteries
                const newArrChampionLocal = []

                if (arrChampion != undefined || arrChampion != null) {
                    arrChampion.forEach((champion) => {
                        var foundItem = libraryChampion.find(function (item) {
                            return item.key === champion.championId;
                        });

                        if (foundItem) {
                            newArrChampionLocal.push(foundItem)
                        } else {
                            newArrChampionLocal.push('đang cập nhật')
                            console.log('Không tìm thấy giá trị với key trùng khớp');
                        }
                    });
                } else {
                    null
                }

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
                            {
                                name: 'Tướng top 1',
                                value: newArrChampionLocal[0]?.name + ' ' + `${arrChampion[0]?.score + ' ' + 'Điểm'}`,
                                inline: true
                            },
                            {
                                name: 'Tướng top 2',
                                value: newArrChampionLocal[1]?.name + ' ' + `${arrChampion[1]?.score + ' ' + 'Điểm'}`,
                                inline: true
                            },
                            {
                                name: 'Tướng top 3',
                                value: newArrChampionLocal[2]?.name + ' ' + `${arrChampion[2]?.score + ' ' + 'Điểm'}`,
                                inline: true
                            },
                        );
                    await message.reply({ embeds: [embed] });
                }
            }
        }
    },
    historyChampion: () => {
        return {
            name: `${prefix} hst`,
            description: 'Ping command',
            execute: async (message, args, userName) => {
                try {
                    const checkUser = await getDataChampion.searchUser(userName);
                    const puuid = checkUser.puuid;
                    const historySummoner = await getDataChampion.checkHistoryChampion(puuid);
                    const arrHistory = historySummoner?.matches;

                    console.log(arrHistory)

                    if (arrHistory === undefined) {
                        return message.reply('Hệ thống bị lỗi ERROR !!!');
                    }

                    const listWin = [];
                    const listFail = [];
                    const fields = [];
                    const newArrChampionLocal = [];

                    for (let i = 0; i < 5; i++) {
                        var foundItem = libraryChampion.find((item) => item.key === arrHistory[i].championId);

                        if (foundItem) {
                            newArrChampionLocal.push(foundItem);
                        } else {
                            newArrChampionLocal.push('đang cập nhật');
                            console.log('Không tìm thấy giá trị với key trùng khớp');
                        }

                        if (arrHistory[i].win) {
                            listWin.push(arrHistory[i]);
                        } else {
                            listFail.push(arrHistory[i]);
                        }

                        fields.push(
                            {
                                name: 'Map game',
                                value:`${arrHistory[i].type} **${arrHistory[i].teamPosition == '' ? 'Anonymous' : arrHistory[i].teamPosition}** `,
                                inline: true,
                            },
                            {
                                name: 'Thời gian trận đấu',
                                value: `${arrHistory[i].gameDuration % 60} Phút ${arrHistory[i].gold} Vàng` ,
                                inline: true,
                            },
                            {
                                name: 'Tướng chơi',
                                value: `${newArrChampionLocal[i].name}` + '',
                                inline: true,
                            },
                            {
                                name: 'KDA',
                                value: `***Giết*** ${arrHistory[i].k} ***Chết*** ${arrHistory[i].d} ***Hỗ trợ*** ${arrHistory[i].a} ***kDA*** = ${((arrHistory[i].k + arrHistory[i].a ) / arrHistory[i].d).toFixed(2)} ` + '',
                              
                            },
                            { name: '\u200B', value: '\u200B' },
                        );
                    }

                    const embed = new EmbedBuilder()
                        .setTitle(`Tỉ số 5 trận gần đây nhất ******* Thắng ${listWin.length} Thua ${listFail.length} *******`)
                        .setThumbnail('https://64.media.tumblr.com/71c80996a06521f9f28c10ab08e06cb1/2cb1d757f11a0977-33/s500x750/a9641ba250bf355ce97352e2d4524d8d8c62bfb4.jpg')
                        .setTimestamp(Date.now())
                        .addFields(
                            ...fields
                        );

                    return message.reply({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    return message.reply('Đã có lỗi xảy ra trong quá trình xử lý.');
                }
            }

        }
    }
};

module.exports = InforUser