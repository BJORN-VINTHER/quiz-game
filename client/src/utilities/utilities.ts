export async function getIp() {
  return httpGet("https://api.ipify.org?format=json").then((x) => x.ip);
}

export async function httpGet(endpoint: string) {
  return fetch(endpoint)
    .then((x) => handleResponse(x))
    .catch((x) => console.error(x));
}

export async function httpPost(endpoint: string, body: any): Promise<any> {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((x) => handleResponse(x))
    .catch((x) => console.error(x));
}

function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text();
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
