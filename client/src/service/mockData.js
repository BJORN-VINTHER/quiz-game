const bvHomePc = "213.32.243.108";

export const players = [
    {
        ip: "200.000.000",
        playerName: "Santa Klaus",
        points: 0
    },
    {
        ip: "200.000.000",
        playerName: "Sasha",
        points: 0
    },
    {
        ip: "300.000.000",
        playerName: "McDonald-Man",
        points: 100
    },
    {
        ip: "400.000.000",
        playerName: "Shubhanka",
        points: 100
    },
    {
        ip: "500.000.000",
        playerName: "Germania",
        points: 0
    },
    {
        ip: "600.000.000",
        playerName: "Sweet Gamer!",
        points: 0
    },
    {
        ip: "700.000.000",
        playerName: "Obi wan Kenobi 123",
        points: 0
    },
    {
        ip: "800.000.000",
        playerName: "Shabubi",
        points: 0
    },
    {
        ip: bvHomePc,
        playerName: "Obi wan Kenobi",
        points: 0
    },
]

export const questions = [
    {
        index: 0,
        text: "My goal of todays session is _",
        player: {
            ip: "0",
            playerName: "Bjørn Vinther",
        },
        options: [
            "for us to learn something about each other and have a good time.",
            "to serve as a basis for your performance evaluation.",
            "for me to learn english.",
            "to make you debug my code."
        ]
    },
    {
        index: 1,
        text: "I like listening to _ when I need a break.",
        player: players[6],
        options: [
            "smooth jazz",
            "pop and rock",
            "movie soundtracks",
            "heavy metal"
        ]
    },
    {
        index: 2,
        text: "When I grow old I will tell my grandchildren _",
        player: players[1],
        options: [
            "how proud I am of them",
            "how things were so much better when I was young",
            "to shut up",
            "to learn martial arts in case their salary negotiation would go wrong"
        ]
    },
    {
        index: 3,
        text: "If I could choose a super power it would be _",
        player: players[3],
        options: [
            "superfast runnning, but only when I'm cold.",
            "superhuman strength in one arm",
            "super vision but only when it's dark",
            "that I can poop money, but only quaters"
        ]
    },
    {
        index: 4,
        text: "I consider _ a crime against humanity.",
        player: players[7],
        options: [
            "getting up before 7am",
            "committing code without testing",
            "pinapple on pizza",
            "back-to-back meetings"
        ]
    },

]

export const gameStates = [
    {
        host: bvHomePc,
        gameId: 100,
        totalQuestions: questions.length - 1,
        currentQuestion: 0,
        players: players
    },
]