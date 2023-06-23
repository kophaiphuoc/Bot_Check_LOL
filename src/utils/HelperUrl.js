const DOMAIN = process.env.DOMAIN;
const TOP_CHAMPION = 'api/v2/lol/mastery/'
const HIGH_RANK = 'api/v2/lol/rank/'
const FIRE_GOD = 'api/v2/lol/statstones/'
const SEARCH_USER = 'api/v2/lol/search'
const START_SEARCH_LIST_SUMMONER ='api/v3/lol/matches-puuid/'
const END_SEARCH_LIST_SUMMONER ='?&championId=&queueId='

const URL_TOP_CHAMPION = `${DOMAIN}${TOP_CHAMPION}`;
const URL_HIGH_RANK = `${DOMAIN}${HIGH_RANK}`;
const URL_FIRE_GOD = `${DOMAIN}${FIRE_GOD}`;
const URL_SEARCH_USER = `${DOMAIN}${SEARCH_USER}`;
const START_URL_LIST_SUMMONER = `${DOMAIN}${START_SEARCH_LIST_SUMMONER}`;
const END_URL_LIST_SUMMONER = `${END_SEARCH_LIST_SUMMONER}`;

module.exports = {URL_TOP_CHAMPION,URL_HIGH_RANK,URL_FIRE_GOD,URL_SEARCH_USER,START_URL_LIST_SUMMONER,END_URL_LIST_SUMMONER};
