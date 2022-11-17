import { Player } from "../../hooks/players/getPlayer";
import { createElem, deleteByIds, filterSort, paginationSort, putElemById } from ".././utils"
import { fakeDataPlayers } from "./data";

interface Players {
  players: Player[]
}

const data: Players = new (fakeDataPlayers as any)()

export const fakePlayers = (url: string, config: any) => {
  console.log("LOG -> ~ fakeUsers ~ config", config)
  console.log("LOG -> ~ fakeUsers ~ url", url)
  if (config.method === 'get') {
    const id = url.match(/.*\/(.*)$/);
    if (id && id[1] !== 'players') {
      const playersIds = data.players.map(player => player.id!.toString())
      if (playersIds.includes(id[1])) {
        return data.players.find(player => player.id!.toString() === id[1])
      }
      throw new Error('Get player error')
    }
    const filterContent = filterSort(data.players, config.params)
    const content = paginationSort(filterContent, config.params);
    return {
      content,
      number: config.params.page,
      numberOfElements: content.length,
      size: config.params.size,
      totalElements: filterContent.length,
      totalPages: Number.isInteger(filterContent.length / config.params.size) ? filterContent.length / config.params.size : filterContent.length / config.params.size  + 1
    };
  } else if (config.method === 'delete') {
    if (config.data.includes(29)) {
      throw new Error('Error')
    } else {
      data.players = deleteByIds(data.players, config.data)
      return data.players
    }
  } else if (config.method === 'post') {
    const elem = {
      ...config.data,
      roles: config.data.roles[0]
    }
    return createElem(data.players, elem);
  } else if (config.method === 'put') {
    const id = url.match(/.*\/(.*)$/);
    if (id) {
      const playersIds = data.players.map(player => player.id!.toString())
      if (playersIds.includes(id[1])) {
        putElemById(data.players, config.data, id)
        return config.data
      }
      throw new Error('Edit player error')
    }
  }
}

