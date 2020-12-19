import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

let dispatchEvent = function (
    event,
    data
) {
    let messagePrefix = "\n\nCannot dispatch event:\n\n";
    let message = messagePrefix;

    let events = [];

    if(typeof event === "string") {
        events.push(event);
    } else {
        if(event instanceof Array) {
            events = event;
        } else {
            message += "\nArgument 'eventType':";
            message += "\nMust be a string or an array of strings";
            message += "\n\n";

            throw new Error(message);
        }
    }

    for(let i = 0; i < events.length; i++) {
        dispatch(
            events[i],
            data
        );
    }
}

export { dispatchEvent };