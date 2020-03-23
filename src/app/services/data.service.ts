import { Injectable } from '@angular/core';
import { Employer } from '../models/employer';
import { Advertisement } from '../models/advertisement';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  advertList: Advertisement[] = [
    {
      id: 2,
      name: "JS Dev ",
      description: "d",
      disclaimer: "dis",
      experience: "Junior",
      employment: "B2B",
      salary_from: 1000,
      salary_to: 2000,
      currency: "EUR",
      city: "Warszawa",
      street: "s",
      remote: 0,
      tech_stack: [
                  {
                      name: "Python 3",
                      level: "4"
                  },
                  {
                      name: "Unit tests",
                      level: "3"
                  },
                  {
                      name: "GIT",
                      level: "3"
                  }
              ],
      technology: "JS",
      contact: "c",
      website: null,
      expires_at: "2020-03-22 16:40:30",
      created_at: "2020-03-22T00:42:49.000000Z",
      updated_at: "2020-03-22T00:42:49.000000Z",
      employer: {
                  id: 1,
                  "name": "baloo",
                  slug: "baloo",
                  "size": 0,
                  "website": "localhost",
                  "logo": "path_to_logo",
                  "link": "http://213.92.171.157/employer/baloo",
                  "created_at": "2020-03-21T21:40:27.000000Z",
                  "updated_at": "2020-03-21T21:40:27.000000Z"
              }
          },
          {
            id: 3,
            name: "Front end JS Dev ",
            description: `As a Senior JAVA Full-stack developer you become part of a software organization of 120 specialists who are ready to challenge you professionally. In your daily work, you will be part of a project team of about 10 colleagues, and together you will create the solutions that will become the world's leading luggage systems in the departure and arrival halls of the world.
            We take care of the entire SW development palette of our complex systems. You will have the opportunity to get your hands on things like back-end, databases, algorithms, GUI, configuration and testing.`,
            disclaimer: "Informujemy, że administratorem danych jest PGB Human Resources sp. z o. o. z siedzibą w Poznaniu, ul. Reglowa 3 (dalej jako 'administrator'). Masz prawo do żądania dostępu do swoich danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu",
            experience: "Junior",
            employment: "B2B",
            salary_from: 1000,
            salary_to: 2000,
            currency: "EUR",
            city: "Warszawa",
            street: "some street 34/3",
            remote: 0,
            tech_stack: [
                        {
                            name: "Python 3",
                            level: "4"
                        },
                        {
                            name: "Unit tests",
                            level: "3"
                        },
                        {
                            name: "GIT",
                            level: "3"
                        }
                    ],
            technology: "JS",
            contact: "contact@gmail.com",
            website: "www.sanium.pl",
            expires_at: "2020-03-22 16:40:30",
            created_at: "2020-03-22T00:42:49.000000Z",
            updated_at: "2020-03-22T00:42:49.000000Z",
            employer: {
                        id: 1,
                        "name": "baloo",
                        slug: "baloo",
                        "size": 150,
                        "website": "localhost",
                        "logo": "path_to_logo",
                        "link": "http://213.92.171.157/employer/baloo",
                        "created_at": "2020-03-21T21:40:27.000000Z",
                        "updated_at": "2020-03-21T21:40:27.000000Z"
                    }
                },
    {
      id: 2,
      name: "JS Dev ",
      description: "d",
      disclaimer: "dis",
      experience: "Junior",
      employment: "B2B",
      salary_from: 1000,
      salary_to: 2000,
      currency: "EUR",
      city: "Warszawa",
      street: "s",
      remote: 0,
      tech_stack: [
                  {
                      name: "Python 3",
                      level: "4"
                  },
                  {
                      name: "Unit tests",
                      level: "3"
                  },
                  {
                      name: "GIT",
                      level: "3"
                  }
              ],
      technology: "JS",
      contact: "c",
      website: null,
      expires_at: "2020-03-22 16:40:30",
      created_at: "2020-03-22T00:42:49.000000Z",
      updated_at: "2020-03-22T00:42:49.000000Z",
      employer: {
                  id: 1,
                  "name": "baloo",
                  slug: "baloo",
                  "size": 0,
                  "website": "localhost",
                  "logo": "path_to_logo",
                  "link": "http://213.92.171.157/employer/baloo",
                  "created_at": "2020-03-21T21:40:27.000000Z",
                  "updated_at": "2020-03-21T21:40:27.000000Z"
              }
          },
          {
            id: 3,
            name: "JS Dev ",
            description: "d",
            disclaimer: "dis",
            experience: "Junior",
            employment: "B2B",
            salary_from: 1000,
            salary_to: 2000,
            currency: "EUR",
            city: "Warszawa",
            street: "s",
            remote: 0,
            tech_stack: [
                        {
                            name: "Python 3",
                            level: "4"
                        },
                        {
                            name: "Unit tests",
                            level: "3"
                        },
                        {
                            name: "GIT",
                            level: "3"
                        }
                    ],
            technology: "JS",
            contact: "c",
            website: null,
            expires_at: "2020-03-22 16:40:30",
            created_at: "2020-03-22T00:42:49.000000Z",
            updated_at: "2020-03-22T00:42:49.000000Z",
            employer: {
                        id: 1,
                        "name": "baloo",
                        slug: "baloo",
                        "size": 0,
                        "website": "localhost",
                        "logo": "path_to_logo",
                        "link": "http://213.92.171.157/employer/baloo",
                        "created_at": "2020-03-21T21:40:27.000000Z",
                        "updated_at": "2020-03-21T21:40:27.000000Z"
                    }
                },
  {
    id: 2,
    name: "JS Dev ",
    description: "d",
    disclaimer: "dis",
    experience: "Junior",
    employment: "B2B",
    salary_from: 1000,
    salary_to: 2000,
    currency: "EUR",
    city: "Warszawa",
    street: "s",
    remote: 0,
    tech_stack: [
                {
                    name: "Python 3",
                    level: "4"
                },
                {
                    name: "Unit tests",
                    level: "3"
                },
                {
                    name: "GIT",
                    level: "3"
                }
            ],
    technology: "JS",
    contact: "c",
    website: null,
    expires_at: "2020-03-22 16:40:30",
    created_at: "2020-03-22T00:42:49.000000Z",
    updated_at: "2020-03-22T00:42:49.000000Z",
    employer: {
                id: 1,
                "name": "baloo",
                slug: "baloo",
                "size": 0,
                "website": "localhost",
                "logo": "path_to_logo",
                "link": "http://213.92.171.157/employer/baloo",
                "created_at": "2020-03-21T21:40:27.000000Z",
                "updated_at": "2020-03-21T21:40:27.000000Z"
            }
        },
        {
          id: 3,
          name: "JS Dev ",
          description: "d",
          disclaimer: "dis",
          experience: "Junior",
          employment: "B2B",
          salary_from: 1000,
          salary_to: 2000,
          currency: "EUR",
          city: "Warszawa",
          street: "s",
          remote: 0,
          tech_stack: [
                      {
                          name: "Python 3",
                          level: "4"
                      },
                      {
                          name: "Unit tests",
                          level: "3"
                      },
                      {
                          name: "GIT",
                          level: "3"
                      }
                  ],
          technology: "JS",
          contact: "c",
          website: null,
          expires_at: "2020-03-22 16:40:30",
          created_at: "2020-03-22T00:42:49.000000Z",
          updated_at: "2020-03-22T00:42:49.000000Z",
          employer: {
                      id: 1,
                      "name": "baloo",
                      slug: "baloo",
                      "size": 0,
                      "website": "localhost",
                      "logo": "path_to_logo",
                      "link": "http://213.92.171.157/employer/baloo",
                      "created_at": "2020-03-21T21:40:27.000000Z",
                      "updated_at": "2020-03-21T21:40:27.000000Z"
                  }
              },
];

  constructor() { }

  getAdverts(): Advertisement[] {
    return this.advertList;
  }

  getSingleAdvert(id: number): Advertisement {
    return this.advertList.find( (el) => el.id === id );
  }

}
