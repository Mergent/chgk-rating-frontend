export const ID_TOKEN = "access_token";
export const LOCALE = 'locale'

export type Links = typeof links;

const links = {
  services: {
    auth: {
      url: "http://127.0.0.1:8093/authservice",
      endpoints: {
        token: "/oauth/token"
      }
    }
  }
} as const;

export default links;
