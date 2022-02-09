const { v4: uuidv4 } = require_('uuid');

export class game {
    gameID = uuidv4();;
    players = [];
    hostIP;
    inviteCode;

    constructor(hostIP, inviteCode) {
        this.hostIP = hostIP;
        this.inviteCode = inviteCode;
    }

    addPlayer(player) {
        this.players.push(player);
    }
}
