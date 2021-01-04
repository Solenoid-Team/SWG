<script>

/*
 Dependencies:
    HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let controller   =        null;
export let value        =        null;

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

let callbacks = {
    "click": function (e) {
        //console.debug(e);

        if(disabled) {
            return;
        }

        if(values.length > 0) {
            if(valueIndex === (values.length - 1)) {
                valueIndex = -1;
            }

            valueIndex++;
        }

        if(valueIndex >= 0 && valueIndex <= (values.length - 1)) {
            value = values[valueIndex];
        } else {
            value = value;
        }
        
        let detail = {
            "controller": controller,
            "data": {
                "value": value
            }
        };

        dispatchEvent(
            "swg-input",
            detail
        );

        if(values.length === 0) {
            return;
        }

        dispatchEvent(
            "swg-change",
            detail
        );
    },
    "mousedown": function (e) {
        //console.debug(e);

        if(disabled) {
            return;
        }

        let detail = {
            "controller": controller,
            "data": {
                "value": value,
                "state": "down"
            }
        };

        dispatchEvent(
            "swg-mousestatechange",
            detail
        );
    },
    "mouseup": function (e) {
        //console.debug(e);

        if(disabled) {
            return;
        }

        let detail = {
            "controller": controller,
            "data": {
                "value": value,
                "state": "up"
            }
        };

        dispatchEvent(
            "swg-mousestatechange",
            detail
        );
    },
    "mouseenter": function (e) {
        //console.debug(e);

        let detail = {
            "controller": controller,
            "data": {
                "value"   : value,
                "position": "over",
                "coords"  : {
                    "x": e.clientX,
                    "y": e.clientY
                }
            }
        };

        dispatchEvent(
            "swg-mousepositionchange",
            detail
        );
    },
    "mouseleave": function (e) {
        //console.debug(e);

        let detail = {
            "controller": controller,
            "data": {
                "value"   : value,
                "position": "out",
                "coords"  : null
            }
        };

        dispatchEvent(
            "swg-mousepositionchange",
            detail
        );
    },
    "mousemove": function (e) {
        //console.debug(e);

        let detail = {
            "controller": controller,
            "data": {
                "value"   : value,
                "position": "over",
                "coords"  : {
                    "x": e.clientX,
                    "y": e.clientY
                }
            }
        };

        dispatchEvent(
            "swg-mousepositionchange",
            detail
        );
    },
    "blur": function (e) {
        //console.debug(e);

        let detail = {
            "controller": controller,
            "data": {
                "value": value,
                "focus": false
            }
        };

        dispatchEvent(
            "swg-focuschange",
            detail
        );
    },
    "focus": function (e) {
        //console.debug(e);

        let detail = {
            "controller": controller,
            "data": {
                "value": value,
                "focus": true
            }
        };

        dispatchEvent(
            "swg-focuschange",
            detail
        );
    }
};

onMount(function(e) {    
    
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-slider"
    bind:this={controller}

    on:click={callbacks["click"]}
    on:mousedown={callbacks["mousedown"]}
    on:mouseup={callbacks["mouseup"]}
    on:mouseenter={callbacks["mouseenter"]}
    on:mouseleave={callbacks["mouseleave"]}
    on:keydown={callbacks["keydown"]}
    on:blur={callbacks["blur"]}
    on:focus={callbacks["focus"]}
>
    
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

.swg-slider {
    width: 100%;
    display: block;
}

</style>