
export interface GameState {
    host: string,
    inviteCode: string,
    currentQuestion: number,
    totalQuestions: number,
    playerScores: PlayerScore[]
}

export interface PlayerScore {
    playerIP: string,
    userName: string,
    score: number
}

export interface Question {
    index: number,
    questionText: string,
    playerIP: string,
    currentTurnPlayerName: string,
    choices: string[]
}

export interface QuestionResult {
    correctAnswerIndex: number,
    answers: Answer[],
    scores: PlayerScore[]
}

export interface Answer {
    playerIP: string,
    userName: string,
    answer: number
}

export interface CreateGameResult {
    inviteCode: string
}

export interface Player {
    playerIP: string,
    playerName: string,
}