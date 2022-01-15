import { writable } from "svelte/store";

export const authenticated = writable(false);
export const tweets = writable([]);
export const modal = writable(null);