const baseUrl = window.location.href.includes("https://tetraaa.fr/") ? "https://api.tetraaa.fr/" : "http://localhost:8080/";

type FetchError = {
    error: string;
};
export function get<ResponseType, ErrorType = unknown | FetchError>(url: string, init?: RequestInit) {
    return new Promise<ResponseType>(async (resolve, reject) => {
        try {
            const response = await fetch(baseUrl + url, init);
            if (!response.ok) {
                reject(response.json() as ErrorType);
                return;
            }
            resolve(response.json());
        } catch (err) {
            reject({ error: "Serveur inaccessible." });
        }
    });
}
