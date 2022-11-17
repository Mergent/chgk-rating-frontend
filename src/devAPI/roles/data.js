export function fakeDataRoles() {
  let roles = [
    {
      "id": 1,
      "title": "ADMIN",
    },
    {
      "id": 2,
      "title": "TOURNAMENT_ORGCOM",
    },
    {
      "id": 3,
      "title": "TOURNAMENT_REPRESENTATIVE",
    },
    {
      "id": 4,
      "title": "TOURNAMENT_LEADING",
    },
    {
      "id": 5,
      "title": "TOURNAMENT_PLAYER",
    },
  ]

  Object.defineProperty(this, 'roles', {
    get() {
      return roles;
    },
    set(value) {
      roles = value;
    }
  });
}
