export const UnlockAccess = (role) => {
  const group =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')).group
  return group === role && true
}

export const UnlockAccessRoute = (role) => {
  const group =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')).group.split(' ')

  let willReturn = []
  let i, j
  for (i in group) {
    for (j in role) {
      willReturn.push(role[j] === group[i])
    }
  }

  return willReturn.includes(true)
}
