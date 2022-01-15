import { goto } from "$app/navigation"
import { post } from './api'

export function direct(site) {
    const href = site;
    goto(href, { noscroll: true, keepfocus: true });
};

export function getTime(tweet) {
    const tweet_time = parseInt((new Date(tweet).getTime()).toFixed(0))
    const today = Math.floor((new Date()).getTime())

    const difference = today - tweet_time;

    const seconds = { time: difference / 1000, text: "s" }
    const minutes = { time: seconds.time / 60, text: "m" }
    const hours = { time: minutes.time / 60, text: "h" }
    const days = { time: hours.time / 24, text: "d" }
    const weeks = { time: days.time / 7, text: "w" }
    const months = { time: weeks.time / 4, text: "mos" }
    const years = { time: months.time / 12, text: "y" }

    let time;
    if (seconds.time < 60) {
        time = seconds
    } else if (minutes.time < 60) {
        time = minutes
    } else if (hours.time < 24) {
        time = hours
    } else if (days.time < 7) {
        time = days
    } else if (weeks.time < 52) {
        time = weeks
    } else if (months.time < 12) {
        time = months
    } else {
        time = years
    }

    return `${Math.floor(time.time)}${time.text}`
}
