export async function handle({ request, resolve }) {
    return await resolve(request);

}

export function getSession(request) {
    return {
    };
}