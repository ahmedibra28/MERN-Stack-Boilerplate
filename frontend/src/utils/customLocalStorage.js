export const customLocalStorage = () => {
  return {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,

    userRole: localStorage.getItem('userRole')
      ? JSON.parse(localStorage.getItem('userRole'))
      : null,
  }
}

export const config = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        customLocalStorage() &&
        customLocalStorage().userInfo &&
        `Bearer ${customLocalStorage().userInfo.token}`,
    },
  }
}
