
export async function getIp() {
    return httpGet('https://api.ipify.org?format=json').then(x => x.ip);
}

export async function httpGet(endpoint) {
    return fetch(endpoint)
        .then(x => handleResponse(x))
        .catch(x => console.error(x));
}

export async function httpPost(endpoint, body) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null
    })
        .then(x => handleResponse(x))
        .catch(x => console.error(x));
}

function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return response.text();
    }
}