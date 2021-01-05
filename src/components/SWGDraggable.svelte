<script>

/*
 Dependencies:
    HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let step         =            1;

export let controller   =         null;
export let value        =         true;

export let info = {
    "coords": {
        "start": {
            "x": 0,
            "y": 0
        },
        "end": {
            "x": 0,
            "y": 0
        }
    },
    "diff": {
        "dx": 0,
        "dy": 0
    }
};

let container           =         null;
let handler             =         null;

let drag                =        false;

$: info.diff.dx = info.coords.end.x - info.coords.start.x;
$: info.diff.dy = info.coords.end.y - info.coords.start.y;

let dispatchEvent = function (
    eventType,
    detail
) {
    dispatch(
        eventType,
        detail
    );

    controller.triggerEvent(
        eventType,
        detail
    );
};

let getContainer = function () {
    let element = controller.climbUntil("swg-draggable-container");

    if(element === null) {
        element = controller.parentNode;
    }

    return element;
};

let getHandler = function () {
    let element = controller.climbUntil("swg-draggable-handler");

    if(element === null) {
        element = controller;
    }

    return element;
};

let callbacks = {
    "mousedown": function (e) {
        if(!value) {
            return;
        }

        info.coords.start.x = e.clientX;
        info.coords.start.y = e.clientY;

        drag = true;

        let detail = {
            "controller": controller,
            "data": info
        };

        dispatchEvent(
            "swg-dragstart",
            detail
        );
    },
    "mouseup": function (e) {
        if(!value) {
            return;
        }

        drag = false;

        let detail = {
            "controller": controller,
            "data": info
        };

        dispatchEvent(
            "swg-dragend",
            detail
        );
    },
    "mousemove": function (e) {
        if(!value) {
            return;
        }

        if(!drag) {
            return;
        }

        info.coords.end.x = e.clientX;
        info.coords.end.y = e.clientY;

        let detail = {
            "controller": controller,
            "data": info
        };

        dispatchEvent(
            "swg-drag",
            detail
        );
    }
};

onMount(function(e) {
    container = getContainer();
    handler   = getHandler();

    container.style.position = "relative";
    handler.style.position   = "relative";

    
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-draggable"
    bind:this={controller}
>
    <slot></slot>
</div>

<style>

.swg {
    font-family: "Montserrat";
}

.swg,
.swg * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
}

.swg-draggable {
    
}

</style>