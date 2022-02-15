

export const players = [
    {
        ip: "100.000.000",
        playerName: "Mr Robot",
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
        points: 0
    },
    {
        ip: "400.000.000",
        playerName: "Shubhanka",
        points: 0
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
        playerName: "Obi wan Kenobi 5648",
        points: 0
    },
    {
        ip: "800.000.000",
        playerName: "Shabubi",
        points: 0
    },
    {
        ip: "#Proud_Mama",
        playerName: "Obi wan Kenobi 5648",
        points: 0
    },
    
]

export const questions = [
    {
        text: "My goal of todays session is _",
        player: players[4],
        options: [
            "For us to learn something about each other and have a good time",
            "to serve as a basis for your performance evaluation.",
            "for me to learn english.",
            "to make you debug my code."
        ]
    },
    {
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
        text: "When I grow old I will tell my grandchildren _",
        player: players[1],
        options: [
            "how proud I am of them",
            "how things were so much better when he was young",
            "to shut up",
            "to learn martial arts in case their salary negotiation would go wrong"
        ]
    },
    
]

export const answers = [
    {
        1: [players[2], players[3], players[8],],
        2: [players[1], players[4], players[6], players[0],],
        3: [],
        4: [players[5], players[7],]
    },
    {
        1: [players[2]],
        2: [players[1], , players[6], players[0],],
        3: [players[3], players[8], players[4]],
        4: [players[5], players[7]]
    },
    {
        1: [players[2], players[3], players[8], players[4], players[6], players[0], players[1]],
        2: [players[5]],
        3: [],
        4: []
    },
]