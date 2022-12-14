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
    },
    userservice: {
      url: "http://127.0.0.1:8090/userservice",
      endpoints: {
        get_users: "/db/users",
        get_user: "/db/user/:id",
        get_current_user: "/db/user",
        delete_users: "/db/users",
        create_user: "/db/user",
        edit_user: "/db/user/:id"
      }
    },
    roleservice: {
      url: "http://127.0.0.1:8090/roleservice",
      endpoints: {
        get_roles: "/db/roles",
        get_role: "/db/role/:id",
        delete_roles: "/db/roles",
        create_role: "/db/role",
        edit_role: "/db/role/:id"
      }
    },
    playerservice: {
      url: "http://127.0.0.1:8090/playerservice",
      endpoints: {
        get_players: "/db/players",
        player: "/db/player/:id",
        delete_players: "/db/players",
        create_player: "/db/player",
        edit_player: "/db/player/:id"
      }
    }
  }
} as const;

export default links;
