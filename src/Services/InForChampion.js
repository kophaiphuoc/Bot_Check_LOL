const Axios = require('../configs/Axios')
const { URL_TOP_CHAMPION, URL_HIGH_RANK, URL_FIRE_GOD, URL_SEARCH_USER } = require('../utils/HelperUrl')

const getDataChampion = {
    searchUser: async (userName) => {
        const originalString = userName.trim();
        const encodedString = encodeURIComponent(originalString);
        const res = await Axios('GET', URL_SEARCH_USER, encodedString)
        console.log(res)
        if (res == 2) {
            return 2
        } else {
            return res
        }
    },
    topChampion: async (id) => {
        const userId = id
        const res = await Axios('GET',`${URL_TOP_CHAMPION}${userId}`,'')
        console.log(res)
        if (res == 2) {
            return 2
        } else {
            return res
        }
    }
}
module.exports = { getDataChampion }
