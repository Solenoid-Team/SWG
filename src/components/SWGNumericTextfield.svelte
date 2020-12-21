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
export let value       =         0;
export let hint        =        "";

export let minValue    = -Infinity;
export let maxValue    = +Infinity;

export let step        =         1;

let layout             =      null;

let controller         =      null;
let textfield          =      null;
let input              =      null;

let valueBefore        =      null;

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

let setTextfieldData = function () {
    textfield.setData(
        "layout",
        layout
    );

    textfield.setData(
        "state",
        state
    );
    
    textfield.setData(
        "disabled",
        disabled
    );
    
    textfield.setData(
        "readonly",
        readonly
    );

    textfield.setData(
        "label",
        label
    );

    textfield.setData(
        "value",
        value
    );

    textfield.setData(
        "hint",
        hint
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

    textfield = controller.querySelector(".swg-textfield");
    input     = textfield.querySelector("input");
    
    setTextfieldData();

    valueBefore = parseFloat(value);

    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "custom":
                return custom;
            break;
            case "controls":
                return controls;
            break;
            case "state":
                return state;
            break;
            case "disabled":
                return disabled;
            break;
            case "readonly":
                return readonly;
            break;
            case "label":
                return label;
            break;
            case "value":
                return input.value;
            break;
            case "hint":
                return hint;
            break;
            case "minValue":
                return minValue;
            break;
            case "maxValue":
                return maxValue;
            break;
            case "step":
                return step;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    controller.setData = function (
        key,
        val
    ) {
        let messagePrefix = "\n\nCannot set data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "custom":
                custom = val;

                layout = getLayout();

                textfield.setData(
                    "layout",
                    layout
                );
            break;
            case "controls":
                controls = val;

                layout = getLayout();

                textfield.setData(
                    "layout",
                    layout
                );
            break;
            case "state":
                state = val;
                
                textfield.setData(
                    "state",
                    state
                );

                button.setData(
                    "state",
                    (state === "default") ? "primary" : state
                );
            break;
            case "disabled":
                disabled = val;

                textfield.setData(
                    "disabled",
                    disabled
                );
            break;
            case "readonly":
                readonly = val;

                textfield.setData(
                    "readonly",
                    readonly
                );
            break;
            case "value":
                value = val;

                textfield.setData(
                    "value",
                    value
                );
            break;
            case "hint":
                hint = val;

                textfield.setData(
                    "hint",
                    hint
                );
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
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    /*controller.delegateFor(
        ".swg-button",
        [
            "swg-input",
            "swg-change",
            "swg-focuschange"
        ],
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );*/

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
        bind:layout
        bind:state
        bind:disabled
        bind:readonly
        bind:label
        bind:value
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