import db from "../src/db/db";

const league = await db.league.create({
    data: { 
        name: 'La Liga',
        country: 'Spain',
    }
});
console.log(`Created league with ID = ${league.leagueId}`)

const league2 = await db.league.create({
    data: { 
        name: 'Premier League',
        country: 'England',
    }
});
console.log(`Created league with ID = ${league2.leagueId}`)


const team1 = await db.team.create({
    data: {
        name: 'FC Barcelona',
        city: 'Barcelona',
        leagueId: league.leagueId,
        players: {
            createMany: {
                data:[
                        {
                            "name": "Lionel Messi",
                            "position": "Forward",
                            "age": 36,
                            "height": 170,
                            "weight": 72
                        },
                        {
                            "name": "Frenkie de Jong",
                            "position": "Midfielder",
                            "age": 27,
                            "height": 180,
                            "weight": 74
                        },
                        {
                            "name": "Pedri",
                            "position": "Midfielder",
                            "age": 20,
                            "height": 177,
                            "weight": 68
                        },
                        {
                            "name": "Lamine Yamal",
                            "position": "Forward",
                            "age": 17,
                            "height": 172,
                            "weight": 68
                        },
                        {
                            "name": "Ilkay Gündogan",
                            "position": "Midfielder",
                            "age": 33,
                            "height": 180,
                            "weight": 80
                        },
                        {
                            "name": "Robert Lewandowski",
                            "position": "Forward",
                            "age": 35,
                            "height": 185,
                            "weight": 81
                        }
                    ]
            }
        }
    }
});
console.log(`Created team with ID = ${team1.teamId}`)

const team2 = await db.team.create({
    data: {
        name: 'Real Madrid',
        city: 'Madrid',
        leagueId: league.leagueId,
        players: {
            createMany: {
                data: [
                    {
                        name: "Karim Benzema",
                        position: "Forward",
                        age: 34,
                        height: 185,
                        weight: 81
                    },
                    {
                        name: "Luka Modric",
                        position: "Midfielder",
                        age: 36,
                        height: 174,
                        weight: 66
                    },
                    {
                        name: "Vinicius Junior",
                        position: "Forward",
                        age: 21,
                        height: 176,
                        weight: 73
                    },
                    {
                        name: "Sergio Ramos",
                        position: "Defender",
                        age: 35,
                        height: 184,
                        weight: 82
                    },
                    {
                        name: "Toni Kroos",
                        position: "Midfielder",
                        age: 32,
                        height: 183,
                        weight: 78
                    },
                    {
                        name: "Thibaut Courtois",
                        position: "Goalkeeper",
                        age: 29,
                        height: 199,
                        weight: 96
                    }
                ]
            }
        }
    }
});
console.log(`Created team with ID = ${team2.teamId}`)

const players = await db.player.findMany({});
for (const player of players) {
    try {
        const stats = await db.playerStats.createMany({
            data: [
                {
                    playerId: player.playerId,
                    goals: getRandomInt(0, 30),
                    assists: getRandomInt(0, 20),
                    yellowCards: getRandomInt(0, 10),
                    redCards: getRandomInt(0, 3),
                    season: "2021-2022",
                    appearances: getRandomInt(10, 38),
                },
                {
                    playerId: player.playerId,
                    goals: getRandomInt(0, 30),
                    assists: getRandomInt(0, 20),
                    yellowCards: getRandomInt(0, 10),
                    redCards: getRandomInt(0, 3),
                    season: "2022-2023",
                    appearances: getRandomInt(10, 38),
                },
                {
                    playerId: player.playerId,
                    goals: getRandomInt(0, 30),
                    assists: getRandomInt(0, 20),
                    yellowCards: getRandomInt(0, 10),
                    redCards: getRandomInt(0, 3),
                    season: "2023-2024",
                    appearances: getRandomInt(10, 38),
                }
            ]
        });
    } catch (error) {
        console.error(`Error creating stats for player ${player.playerId}:`, error);
    }
}


function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}