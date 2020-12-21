<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGButton.svelte
        SWGTextfield.svelte
        fontawesome-free-5.15.1-web
*/

import { onMount } from "svelte";

import SWGTextfield from './SWGTextfield.svelte';
import SWGButton from './SWGButton.svelte';

export let object      =      null;

export let layout      =       "T";
export let state       = "default";

export let disabled    =     false;
export let readonly    =     false;

export let label       =        "";
export let value       =         0;
export let placeholder =        "";
export let hint        =        "";

export let minValue    = -Infinity;
export let maxValue    = +Infinity;

export let step        =         1;

let controller         =      null;
let textfield          =      null;
let input              =      null;

let valueBefore        =      null;
let valueAfter         =      null;

let normalizeValue = function (val) {
    if(val > maxValue) {
        val = maxValue;
    }

    if(val < minValue) {
        val = minValue;
    }

    return val;
}

$: value = normalizeValue(parseFloat(value));

$: valueBefore = parseFloat(valueBefore);
$: valueAfter  = parseFloat(valueAfter);

$: step = parseFloat(value);

$: minValue = parseFloat(minValue);
$: maxValue = parseFloat(maxValue);

let decrementValue = function () {
    valueBefore = parseFloat(value);

    value--;

    value = normalizeValue(value);

    let data = {
        "value"      : value,
        "valueBefore": valueBefore
    };

    controller.triggerEvent(
        [
            "swg-input",
            "swg-decrement"
        ],
        data
    );

    if(value !== valueBefore) {
        controller.triggerEvent(
            "swg-change",
            data
        );
    }
}
let incrementValue = function () {
    valueBefore = parseFloat(value);
    
    value++;

    value = normalizeValue(value);

    let data = {
        "value"      : value,
        "valueBefore": valueBefore
    };

    controller.triggerEvent(
        [
            "swg-input",
            "swg-increment"
        ],
        data
    );

    if(value !== valueBefore) {
        controller.triggerEvent(
            "swg-change",
            data
        );
    }
}

let callbacks = {
    "input": function (e) {
        //console.debug(e);

        if(disabled || readonly) {
            return;
        }

        valueAfter = parseFloat(value);

        valueAfter = normalizeValue(valueAfter);

        let data = {
            "value"      : valueAfter,
            "valueBefore": valueBefore
        };

        controller.triggerEvent(
            "swg-input",
            data
        );

        if(valueAfter !== valueBefore) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }

        valueBefore = valueAfter;
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
    textfield = controller.querySelector(".swg-textfield");

    input = textfield.querySelector("input");
    
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
        "placeholder",
        placeholder
    );

    textfield.setData(
        "hint",
        hint
    );

    //valueBefore = input.value;
    valueBefore = parseFloat(value);

    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
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
            case "placeholder":
                return placeholder;
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
        value
    ) {
        let messagePrefix = "\n\nCannot set data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "state":
                state = value;
                
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
                disabled = value;

                textfield.setData(
                    "disabled",
                    disabled
                );
            break;
            case "readonly":
                readonly = value;

                textfield.setData(
                    "readonly",
                    readonly
                );
            break;
            case "value":
                value = value;

                textfield.setData(
                    "value",
                    value
                );
            break;
            case "hint":
                hint = value;

                textfield.setData(
                    "hint",
                    hint
                );
            break;
            case "minValue":
                minValue = value;
            break;
            case "maxValue":
                maxValue = value;
            break;
            case "step":
                step = value;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    controller.delegateFor(
        ".swg-button",
        [
            "swg-input",
            "swg-change"
        ],
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );

    controller.delegateFor(
        ".swg-button",
        "swg-input",
        function(e) {
            //console.debug(e);

            switch(e.data.value) {
                case "decrement":
                    decrementValue();
                break;
                case "increment":
                    incrementValue();
                break;
            }
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

                let data = {
                    "value"      : parseFloat(e.data.value),
                    "valueBefore": parseFloat(e.data.valueBefore)
                };

                controller.triggerEvent(
                    "swg-input",
                    data
                );
            }
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-textfield swg-numeric-textfield" bind:this={controller} {object}>
    <SWGTextfield {layout} {state} bind:value>
        <div class="icon-box" slot="content-before">
            <slot name="content-before">
                BEFORE
            </slot>
        </div>
        <div class="icon-box" slot="content-after">
            <SWGButton class="icon-button button-increment" type="text" state="primary" values={["increment"]}>
                <i class="fas fa-caret-up"></i>
            </SWGButton>
            <SWGButton class="icon-button button-decrement" type="text" state="primary" values={["decrement"]}>
                <i class="fas fa-caret-down"></i>
            </SWGButton>
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

.swg-textfield {
    
}

.swg-icon-textfield {

}

/*:global(.swg-textfield-content-before) {
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background-color: #00bd9c;
}*/

/*:global(.swg-textfield-content-before) .icon-box {
    padding: 0 10px;
}*/

.swg-numeric-textfield :global(.swg-textfield-content-after) {
    padding: 0 !important;
}

:global(.swg-textfield-content-after) .icon-box {
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.swg-numeric-textfield .icon-box :global(.swg-button) {
    margin: 0;
    padding: 2px;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-numeric-textfield .icon-box :global(.swg-button i) {
    font-size: 16px;
}

.swg-numeric-textfield .icon-box :global(.swg-button:nth-child(1)) {
    border-radius: 0;
    border-top-right-radius: 5px;
}

.swg-numeric-textfield .icon-box :global(.swg-button:nth-child(2)) {
    border-radius: 0;
    border-bottom-right-radius: 5px;
}

</style>