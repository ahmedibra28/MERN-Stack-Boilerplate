export const UnlockAccess = (role) => {
  const roles =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')).roles

  let willReturn = []
  let i, j
  for (i in roles) {
    for (j in role) {
      willReturn.push(role[j] === roles[i])
    }
  }

  return willReturn.includes(true)
}
