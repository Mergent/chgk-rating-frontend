import sign from "jwt-encode"

export const fakeLogin = (url: string, config: any) => {
  if (config.username === 'Bad' || config.password === 'credential') {
    throw new Error('Error')
  }
  const jwt = sign({ user_name: config.username }, '')

  return {
    access_token: jwt,
    email: `${config.username}@startext.dev`,
    expires_in: 86399,
    refresh_token: jwt,
    source: "AD",
    token_type: "bearer",
    username: config.username,
  }
}
