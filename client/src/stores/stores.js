import { writable } from "svelte/store";

export const authenticated = writable(false);
export const tweets = writable([]);
export const whoToFollow = writable([]);
export const modal = writable(null);
export const user = writable([])
export const interactions = writable([])