import { setState } from 'statezero'
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
    if (res.data.eventStatus.event.type === 'Casual') {
      setState('considerEventStages' + (server === 'CN' ? '' : server), res.data.eventStatus.status)
    }
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

export default {
  getAllData
}
