function makeID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}

function getIPFromHttp(request) {
    let IPAddress = request.Header?.Get("X-Real-Ip") ?? "";
    if (IPAddress == "") {
        IPAddress = request.Header?.Get("X-Forwarded-For") ?? "";
    }
    if (IPAddress == "") {
        IPAddress = request.RemoteAddr ?? "";
    }
    return IPAddress;
}

module.exports = {
    makeID,
    getIPFromHttp
}