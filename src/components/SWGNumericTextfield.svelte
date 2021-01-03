<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGTextfield.svelte
        SWGButton.svelte
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

import SWGTextfield from './SWGTextfield.svelte';
import SWGButton from './SWGButton.svelte';

export let custom      =     false;
export let controls    =      true;
export let state       = "default";

export let disabled    =     false;
export let readonly    =     false;

export let label       =        "";
export let hint        =        "";

export let minValue    = -Infinity;
export let maxValue    = +Infinity;

export let step        =         1;

export let controller  =      null;
export let value       =         0;

let textfield          =      null;
let input              =      null;

let valueBefore        =      null;

let layout             =      null;

let normalizeValue = function (val) {
    val = parseFloat(val);

    if(val > maxValue) {
        val = maxValue;
    }

    if(val < minValue) {
        val = minValue;
    }

    return val;
};

let getLayout = function () {
    let result = "";

    if(custom) {
        result += "B";
    }

    result += "T";

    if(controls) {
        result += "A";
    }

    return result;
};

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

$: value = normalizeValue(value);

$: step = parseFloat(value);

$: minValue = parseFloat(minValue);
$: maxValue = parseFloat(maxValue);

$: layout = getLayout();

let decrementValue = function () {
    valueBefore = parseFloat(value);

    value--;

    value = normalizeValue(value);

    let detail = {
        "controller": controller,
        "data": {
            "value"      : value,
            "valueBefore": valueBefore
        }
    };

    dispatchEvent(
        "swg-input",
        detail
    );

    if(value !== valueBefore) {
        dispatchEvent(
            "swg-change",
            detail
        );

        dispatchEvent(
            "swg-decrement",
            detail
        );
    }
}
let incrementValue = function () {
    valueBefore = parseFloat(value);
    
    value++;

    value = normalizeValue(value);

    let detail = {
        "controller": controller,
        "data": {
            "value"      : value,
            "valueBefore": valueBefore
        }
    };

    dispatchEvent(
        "swg-input",
        detail
    );

    if(value !== valueBefore) {
        dispatchEvent(
            "swg-change",
            detail
        );

        dispatchEvent(
            "swg-increment",
            detail
        );
    }
}

let setIconFlag = function () {
    controller.querySelector(".swg-textfield-content-after")
    .setAttribute(
        "icon",
        true
    );
};

let callbacks = {
    "input": function (e) {
        //console.debug(e);

        if(disabled || readonly) {
            return;
        }

        value = normalizeValue(value);

        let detail = {
            "controller": controller,
            "data": {
                "value"      : value,
                "valueBefore": valueBefore
            }
        };

        dispatchEvent(
            "swg-input",
            detail
        );

        if(value !== valueBefore) {
            dispatchEvent(
                "swg-change",
                detail
            );
        }

        valueBefore = value;
    },
    "keydown": function (e) {
        //console.debug(e);

        if(disabled || readonly) {
            return;
        }

        const ALLOWED_CHARACTERS = "0123456789.";

        let allowedCharacter = false;

        for(let i = 0; i < ALLOWED_CHARACTERS.length; i++) {
            if(e.key === ALLOWED_CHARACTERS.charAt(i)) {
                allowedCharacter = true;
            }
        }

        valueBefore = parseFloat(value);

        switch(e.key) {
            case "ArrowDown":
            case "ArrowLeft":
                decrementValue();
            break;
            case "ArrowUp":
            case "ArrowRight":
                incrementValue();
            break;
            case "Backspace":
                if(value.toString().length === 1) {
                    e.preventDefault();

                    value = minValue;
                }
            break;
        }
    },
    "wheel": function (e) {
        if(disabled || readonly) {
            return;
        }

        if(e.target === document.activeElement) {
            e.preventDefault();

            //console.debug(e);

            valueBefore = parseFloat(value);

            if(e.deltaY < 0) {
                incrementValue();
            } else {
                decrementValue();
            }
        }
    }
};

onMount(function(e) {
    setIconFlag();

    input = textfield.querySelector("input");

    valueBefore = parseFloat(value);

    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        let properties = {
            "custom"     : custom,
            "controls"   : controls,
            "state"      : state,
            "disabled"   : disabled,
            "readonly"   : readonly,
            "label"      : label,
            "hint"       : hint,
            "minValue"   : minValue,
            "maxValue"   : maxValue,
            "step"       : step,

            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "custom":
            case "controls":
            case "state":
            case "disabled":
            case "readony":
            case "label":
            case "hint":
            case "minValue":
            case "maxValue":
            case "step":
            case "value":
                return properties[key];
            break;
            default:
                message += "\nProperty '" + key + "' is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    };

    controller.setData = function (
        key,
        val
    ) {
        const messagePrefix = "\n\nCannot set data:\n";
        let message = messagePrefix;

        switch(key) {
            case "custom":
                custom = val;
            break;
            case "controls":
                controls = val;
            break;
            case "state":
                state = val;

                textfield.setData(
                    "state",
                    state
                );
            break;
            case "disabled":
                disabled = val;
            break;
            case "readonly":
                readonly = val;
            break;
            case "label":
                label = val;
            break;
            case "hint":
                hint = val;
            break;
            case "minValue":
                minValue = val;
            break;
            case "maxValue":
                maxValue = val;
            break;
            case "step":
                step = val;
            break;
            case "value":
                value = val;
            break;
            default:
                message += "\nProperty '" + key + "' is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    };

    controller.delegateFor(
        ".swg-button",
        [
            "swg-input",
            "swg-change",
            "swg-focuschange"
        ],
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );

    input.delegateFor(
        "",
        [
            "input",
            "keydown",
            "wheel"
        ],
        function(e) {
            callbacks[e.originalEvent.type](e.originalEvent);
        }
    );

    textfield.delegateFor(
        "",
        [
            "swg-input",
            "swg-change"
        ],
        function(e) {
            //console.debug(e);

            if(!e.originalEvent.target.classList.contains("swg-button")) {
                e.originalEvent.stopPropagation();

                let detail = {
                    "value"      : parseFloat(e.info.data.value),
                    "valueBefore": parseFloat(e.info.data.valueBefore)
                };

                dispatchEvent(
                    "swg-input",
                    detail
                );
            }
        }
    );

    textfield.delegateFor(
        "",
        "swg-focuschange",
        function(e) {
            //console.debug(e);

            if(!e.originalEvent.target.classList.contains("swg-button")) {
                e.originalEvent.stopPropagation();

                let detail = {
                    "controller": controller,
                    "data": {
                        "value": parseFloat(e.info.data.value),
                        "focus": e.info.data.focus
                    }
                };

                dispatchEvent(
                    "swg-focuschange",
                    detail
                );
            }
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-numeric-textfield"
    bind:this={controller}
>
    <SWGTextfield
        bind:controller={textfield}
        bind:value

        bind:layout
        bind:state
        bind:disabled
        bind:readonly
        bind:label
        bind:hint
    >
        <div class="swg-numeric-textfield-content-before" slot="content-before">
            {#if custom}
                <slot></slot>
            {/if}
        </div>
        <div class="swg-numeric-textfield-content-after" slot="content-after">
            {#if controls}
                <div class="icon-box">
                    <SWGButton
                        type="text"
                        state="primary"
                        on:swg-input={incrementValue}
                    >
                        <i class="fas fa-caret-up"></i>
                    </SWGButton>
                    <SWGButton
                        type="text"
                        state="primary"
                        on:swg-input={decrementValue}
                    >
                        <i class="fas fa-caret-down"></i>
                    </SWGButton>
                </div>
            {/if}
        </div>
    </SWGTextfield>
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

.swg-numeric-textfield {

}

.swg-numeric-textfield :global(.swg-textfield-content-extra[icon='true']) {
    padding: 0;
    background-color: transparent;
}

.swg-numeric-textfield .icon-box {
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.swg-numeric-textfield .icon-box :global(.swg-button) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-numeric-textfield .icon-box :global(.swg-button:first-child) {
    border-radius: 0;
    border-top-right-radius: 5px;
}

.swg-numeric-textfield .icon-box :global(.swg-button:last-child) {
    border-radius: 0;
    border-bottom-right-radius: 5px;
}

.swg-numeric-textfield .icon-box :global(.swg-button i) {
    font-size: 14px;
}

.swg-numeric-textfield :global(
    .swg-textfield-content-before:hover + .swg-textfield-content input
) {
    border-color: #e7e7e7;
}

</style>