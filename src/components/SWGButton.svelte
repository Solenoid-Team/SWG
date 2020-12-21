<script>

/*
 Dependencies:
    HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let type         = "container";
export let disabled     =       false;
export let state        =        null;
export let values       =          [];

export let value        =        null;

export let controller   =        null;

let valueIndex          =           0;

$: {
    if(valueIndex >= 0 && valueIndex <= (values.length - 1)) {
        value = values[valueIndex];
    } else {
        value = null;
    }
}

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

        let detail = {
            "controller": controller,
            "data": {
                "value": value
            }
        };

        if(values.length === 0) {
            dispatchEvent(
                "swg-input",
                detail
            );

            return;
        }

        if(valueIndex === (values.length - 1)) {
            valueIndex = -1;
        }

        valueIndex++;

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
    "keydown": function (e) {
        //console.debug(e);

        if(disabled) {
            return;
        }

        if(e.key === "Enter") {
            controller.click();
        }
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
    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        if($$props[key] === undefined || key === "controller") {
            message += "\nProperty '" + key + "' is not recognized";
            message += "\n\n";

            throw new Error(message);
        }

        return $$props[key];
    };

    controller.setData = function (
        key,
        val
    ) {
        const messagePrefix = "\n\nCannot set data:\n\n";
        let message = messagePrefix;

        if($$props[key] === undefined || key === "controller") {
            message += "\nProperty '" + key + "' is not recognized";
            message += "\n\n";

            throw new Error(message);
        }

        $$props[key] = val;
    };
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-button" role=button tabindex=0
    bind:this={controller}

    {type}
    {disabled}
    {state}

    on:click={callbacks["click"]}
    on:mousedown={callbacks["mousedown"]}
    on:mouseup={callbacks["mouseup"]}
    on:mouseenter={callbacks["mouseenter"]}
    on:mouseleave={callbacks["mouseleave"]}
    on:keydown={callbacks["keydown"]}
    on:blur={callbacks["blur"]}
    on:focus={callbacks["focus"]}
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

.swg-button {
    display: block;
    cursor: pointer;
}

.swg-button[type='text'] {
    margin: 4px;
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    user-select: none;
    border: 1px solid transparent;
    border-radius: 5px;
}

.swg-button[state='primary'] {
    color: #ffffff;
    background-color: #00bd9c;
}
.swg-button[state='primary']:focus {
    border-color: #00ad8f;
    box-shadow: 0px 0px 4px 1px #00bd9c;
}

.swg-button[state='secundary'] {
    color: #515151;
    /*background-color: #dbdbdb;*/
    background-color: #e7e7e7;
}
.swg-button[state='secundary']:focus {
    border-color: #e1e1e1;
    /*border-color: #cecece;*/
    box-shadow: 0px 0px 4px 1px #cccccc;
}

.swg-button[state='danger'] {
    color: #ffffff;
    background-color: #ff696d;
}
.swg-button[state='danger']:focus {
    border-color: #f06366;
    box-shadow: 0px 0px 4px 1px #ff696d;
}

.swg-button[state='warning'] {
    color: #ffffff;
    background-color: #ffb140;
}
.swg-button[state='warning']:focus {
    border-color: #f0a63c;
    box-shadow: 0px 0px 4px 1px #ffb140;
}

.swg-button[state='info'] {
    color: #ffffff;
    background-color: #2c97de;
}
.swg-button[state='info']:focus {
    border-color: #298ccf;
    box-shadow: 0px 0px 4px 1px #2c97de;
}

.swg-button[state='light'] {
    color: #515151;
    background-color: #f7f7f7;
}
.swg-button[state='light']:focus {
    border-color: #e8e8e8;
    box-shadow: 0px 0px 4px 1px #f7f7f7;
}

.swg-button[state='dark'] {
    color: #ffffff;
    background-color: #5c5c5c;
}
.swg-button[state='dark']:focus {
    border-color: #4d4d4d;
    box-shadow: 0px 0px 4px 1px #5c5c5c;
}

.swg-button[disabled=true] {
    color: #ffffff;
    background-color: #bcbcbc;
}
.swg-button[disabled=true]:focus {
    border-color: #adadad;
    box-shadow: 0px 0px 4px 1px #bcbcbc;
}

</style>