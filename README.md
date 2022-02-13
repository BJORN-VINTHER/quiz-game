# quiz-game

## Server documentation

### REST API

#### GET

/proofOfConceptGetTest

/socketIOTest

#### POST

/proofOfConceptPostTest

/addGameTest

/addPlayerTest

/hostNewGame (returns {inviteCode: string})

### SocketIO

#### From client

io.connect(url?inviteCode={string}?userName={string}?asHost={boolean}) (returns socket)

'socketAPITest' args: testMessage: string (this function will emit a 'testMessageReceived' event with a message string)

'submitAnswer' args: { answer } (everyone allowed to call)

'startNextRound' (only host allowed)

'showFinalResults' (only host allowed)

#### From server

'turnResultReady' returns {
questionText: string,
currentPlayerID: string,
currentTurnPlayerName: string,
answers: {
playerID: string,
playerName: string,
answerIndex: string,
answerText: string
}[]
} (emitted to everyone)

'startingNewRound' returns {timerSeconds: number} (emitted to everyone)

'roundQuestionReady' returns {
questionText: string,
currentTurnPlayerID: number,
currentTurnPlayerName: string,
choices: string[]
} (emitted to everyone)

'gameStateUpdated' returns {
currentRound: number,
maxRound: number,
playerScores: {
player: string
score: number
}[]
} (emitted to everyone)

'gameEnded' (only emitted to host)
