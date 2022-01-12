import { goto } from "$app/navigation"

export function direct(site) {
    const href = site;
    goto(href, { noscroll: true, keepfocus: true });
};

