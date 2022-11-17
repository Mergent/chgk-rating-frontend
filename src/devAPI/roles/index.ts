import { Role } from "../../hooks/roles/getRole";
import { createElem, deleteByIds, filterSort, paginationSort, putElemById } from ".././utils"
import { fakeDataRoles } from "./data";

interface Roles {
  roles: Role[]
}

const data: Roles = new (fakeDataRoles as any)()

export const fakeRoles = (url: string, config: any) => {
  console.log("LOG -> fakeRoles -> config", config)
  if (config.method === 'get') {
    const id = url.match(/.*\/(.*)$/);
    if (id && id[1] !== 'roles') {
      const rolesIds = data.roles.map(role => role.id!.toString())
      if (rolesIds.includes(id[1])) {
        return data.roles.find(role => role.id!.toString() === id[1])
      }
      throw new Error('Get role error')
    }
    const filterContent = filterSort(data.roles, config.params)
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
      data.roles = deleteByIds(data.roles, config.data)
      return data.roles
    }
  } else if (config.method === 'post') {
    const elem = {
      ...config.data,
      roles: config.data.roles[0]
    }
    return createElem(data.roles, elem);
  } else if (config.method === 'put') {
    const id = url.match(/.*\/(.*)$/);
    if (id) {
      const rolesIds = data.roles.map(role => role.id!.toString())
      if (rolesIds.includes(id[1])) {
        putElemById(data.roles, config.data, id)
        return config.data
      }
      throw new Error('Edit role error')
    }
  }
}

