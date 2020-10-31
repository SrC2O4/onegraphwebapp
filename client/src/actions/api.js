import { setState, getState } from 'statezero'
import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_API_HOST || ''

/**
 * get materials data
 * @param { String } url url
 * @param { String } stateKey react state key
 * @param { String } server server tag {CN,EN,TW}
 * @return { Promise<any> }
 */
async function getMaterials(url, stateKey, server) {
  const res = await axios.get(baseUrl + url + '/' + server)
  setState(stateKey + (server === 'CN' ? '' : server), res.data.material || res.data.stages)
}

/**
 * get event
 * @param { String } server server tag {CN,EN,TW}
 * @return { Promise<any> }
 */
async function getEvent(server) {
  const res = await axios.get(baseUrl + '/activity/' + server)
  if (res.data.eventStatus.status) {
    setState('eventType' + (server === 'CN' ? '' : server), res.data.eventStatus.event.type)
    if (res.data.eventStatus.event.type !== 'Casual') {
      setState('considerEventStages' + (server === 'CN' ? '' : server), false)
    }
  } else {
    setState('considerEventStages' + (server === 'CN' ? '' : server), false)
  }
}

/**
 * get all data in once request
 * @param { String } server server tag {CN,EN,TW}
 * @return { Promise<any> }
 */
async function getTotal(server) {
  const res = await axios.get(baseUrl + '/total/' + server)
  const data = res.data

  setState('t1Material' + (server === 'CN' ? '' : server), data.tier.t1)
  setState('t2Material' + (server === 'CN' ? '' : server), data.tier.t2)
  setState('t3Material' + (server === 'CN' ? '' : server), data.tier.t3)
  setState('t4Material' + (server === 'CN' ? '' : server), data.tier.t4)
  setState('t5Material' + (server === 'CN' ? '' : server), data.tier.t5)
  setState('catalyst' + (server === 'CN' ? '' : server), data.catalyst)
  setState('plan' + (server === 'CN' ? '' : server), data.plan)
  setState('misc' + (server === 'CN' ? '' : server), data.misc)
  setState('gacha' + (server === 'CN' ? '' : server), data.gacha)
  setState('contingencyStore' + (server === 'CN' ? '' : server), data.contingency)
  setState('stages' + (server === 'CN' ? '' : server), data.stages)

  if (data.activity.eventStatus.status) {
    setState('eventType' + (server === 'CN' ? '' : server), data.activity.eventStatus.event.type)
    if (data.activity.eventStatus.event.type !== 'Casual') {
      setState('considerEventStages' + (server === 'CN' ? '' : server), false)
    }
  } else {
    setState('considerEventStages' + (server === 'CN' ? '' : server), false)
  }
}

/**
 * get all data
 * @param { String } server server tag {CN,EN,TW}
 * @return { Promise<any>[] }
 */
function getAllData(server) {
  return [
    getEvent(server),
    getMaterials('/materials/tier/1', 't1Material', server),
    getMaterials('/materials/tier/2', 't2Material', server),
    getMaterials('/materials/tier/3', 't3Material', server),
    getMaterials('/materials/tier/4', 't4Material', server),
    getMaterials('/materials/tier/5', 't5Material', server),
    getMaterials('/materials/catalyst', 'catalyst', server),
    getMaterials('/materials/plan', 'plan', server),
    getMaterials('/materials/gacha', 'gacha', server),
    getMaterials('/materials/misc', 'misc', server),
    getMaterials('/contingency', 'contingencyStore', server),
    getMaterials('/stages', 'stages', server),
  ]
}

/**
 * get history list
 * @param { String } date ISO date string
 * @param { String } server server tag {CN,EN,TW}
 * @return { Promise<any> }
 */
async function getHistoryList(
  date = getState('selectDate'),
  server = getState('server') === 'JP/EN/KR' ? 'EN' : getState('server')
) {
  const res = await axios.get(process.env.REACT_APP_HISTORY_API_HOST + '/list/' + date + '/' + server)
  setState('historyList', res.data)
}

/**
 * get all data in once request form history data
 * @param { String } updateId
 * @return { Promise<any> }
 */
async function getTotalFormHistory(updateId) {
  const res = await axios.get(process.env.REACT_APP_HISTORY_API_HOST + '/total/' + updateId)
  const data = res.data
  const server = res.data.server === 'EN_JP_KR' ? 'EN' : res.data.server

  setState('t1Material' + (server === 'CN' ? '' : server), data.tier.t1)
  setState('t2Material' + (server === 'CN' ? '' : server), data.tier.t2)
  setState('t3Material' + (server === 'CN' ? '' : server), data.tier.t3)
  setState('t4Material' + (server === 'CN' ? '' : server), data.tier.t4)
  setState('t5Material' + (server === 'CN' ? '' : server), data.tier.t5)
  setState('catalyst' + (server === 'CN' ? '' : server), data.catalyst)
  setState('plan' + (server === 'CN' ? '' : server), data.plan)
  setState('misc' + (server === 'CN' ? '' : server), data.misc)
  setState('gacha' + (server === 'CN' ? '' : server), data.gacha)
  setState('contingencyStore' + (server === 'CN' ? '' : server), data.contingency)
  setState('stages' + (server === 'CN' ? '' : server), data.stages)

  if (data.activity.eventStatus.status) {
    setState('eventType' + (server === 'CN' ? '' : server), data.activity.eventStatus.event.type)
    if (data.activity.eventStatus.event.type !== 'Casual') {
      setState('considerEventStages' + (server === 'CN' ? '' : server), false)
    }
  } else {
    setState('considerEventStages' + (server === 'CN' ? '' : server), false)
  }
}

export default {
  getAllData,
  getTotal,
  getHistoryList,
  getTotalFormHistory,
}
