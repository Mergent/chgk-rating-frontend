export const delay = (time: any) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const paginationSort = (array: any, params: any) => {
  let sortContent = array;

  let sort: any = null;
  if (params.sort) {
    sort = params.sort.split(',')
  }
  console.log(sort)

  if (sort?.[0] && sort?.[1]) {
    sortContent = array.sort((a: any, b: any) => {
      if (a[sort[1]] > b[sort[1]]) {
        return sort[0] === 'ascend' ? 1 : -1;
      }
      if (a[sort[1]] < b[sort[1]]) {
        return sort[0] === 'ascend' ? -1 : 1;
      }
      return 0;
    });
  }

  if (params.size === 0) {
    return sortContent
  }

  if ((params.page || params.page === 0) && params.size) {
    return sortContent.filter((_e: any, i: number) => {
      return i < ((params.page + 1) * params.size) && i >= (params.page * params.size)
    });
  }

  return sortContent;
}

export const deleteById = (array: any, id: string) => {
  array.splice(array.findIndex((i: any) => i.id.toString() === id[1]), 1);
}

export const deleteByIds = (array: any, ids: any) => {
  return array.filter((x: any) => !ids.includes(x.id))
}

export const createElem = (array: any, data: any) => {
  const elem = {
    ...data,
    id: array[array.length - 1].id + 1
  }
  array.unshift(elem)
  return elem;
}

export const putElemById = (array: any, data: any, id: any) => {
  const index = array.findIndex((i: any) => i.id.toString() === id[1])
  array[index] = data;
}

export const filterSort = (array: any, params: any) => {
  let filterParams = params, key;
  let filterArray = array;

  for (key in filterParams) {
    if (!key.startsWith('filter')) continue;
    const paramsKey = key.split('.')[1]
    filterArray = filterArray.filter((elem: any) => {
      if (Array.isArray(elem[paramsKey])) {
        return elem[paramsKey].join(',') === filterParams[`filter.${paramsKey}`]
      }
      return elem[paramsKey].includes(filterParams[`filter.${paramsKey}`])

    })
  }

  if (params.search) {
    return filterArray.filter((elem: any) => {
      let include = false;
      for (let value in elem) {
        include = include ? include : elem[value].toString().includes(params.search)
      }

      return include;
    });
  }

  return filterArray;
}
