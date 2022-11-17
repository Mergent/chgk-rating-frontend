export function fakeDataPlayers() {
  let players = [
    {
      firstName: "Александр",
      lastName: "Либер",
      patronymic: "Витальевич",
      position: 2,
      delta: 0,
      rating: 13_784,
      totalTournaments: 1220,
      tournamentsPerYear: 3,
      currentTeam: "Рабочее название",
      towns: [],
      currentTown: "Санкт-Петербург",
      registeredTournaments: [
        {
          id: 8146,
          title: "Nevermore 2"
        }
      ],
      wasNarrator: true,
      wasOrgcommitee: false,
      wasRepresentative: true,
      wasSertifiedReferee: true,
      wasSertifiedEditor: true,
      wasReferee: true,
      link: "https://db.chgk.info/person/aliber",
      isDead: false,
      reference: "",
      id: 18332
    },
    {
      firstName: "Артём",
      lastName: "Сорожкин",
      patronymic: "Сергеевич",
      position: 1,
      delta: 0,
      rating: 13_811,
      totalTournaments: 966,
      tournamentsPerYear: 0,
      currentTeam: "Борский корабел",
      towns: [],
      currentTown: "Москва",
      registeredTournaments: [
        {
          id: 8145,
          title: "Nevermore"
        }
      ],
      wasNarrator: false,
      wasOrgcommitee: true,
      wasRepresentative: false,
      wasSertifiedReferee: false,
      wasSertifiedEditor: false,
      wasReferee: false,
      link: "https://db.chgk.info/person/asorozhkin",
      isDead: false,
      reference: "",
      id: 30152
    },
    {
      firstName: "Ася",
      lastName: "Самойлова",
      patronymic: "Сергеевна",
      position: 3,
      delta: 2.5,
      rating: 13_623,
      totalTournaments: 617,
      tournamentsPerYear: 6,
      currentTeam: "Мир",
      towns: [],
      currentTown: "Москва",
      registeredTournaments: [
        {
          id: 2007,
          title: "Ойна-2002"
        }
      ],
      wasNarrator: true,
      wasOrgcommitee: true,
      wasRepresentative: true,
      wasSertifiedReferee: false,
      wasSertifiedEditor: false,
      wasReferee: false,
      link: "https://db.chgk.info/person/asamojlova",
      isDead: false,
      reference: "(Баранова)",
      id: 2421
    },
  ]

  Object.defineProperty(this, 'players', {
    get() {
      return players;
    },
    set(value) {
      players = value;
    }
  });
}
