import { writable } from "svelte/store";

export const authenticated = writable(false);
export const tweets = writable([]);
export const modal = writable(null);
export const user = writable([])


// username
// password
// confirmPass
// match
// email
// phone
// firstName
// lastName
// isValid