<script>

/*
 Dependencies:
    HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let layout             =       "T";
export let state              = "default";

export let disabled           =     false;
export let readonly           =     false;

export let label              =        "";
export let maxLength          = +Infinity;
export let value              =        "";
export let placeholder        =        "";
export let hint               =        "";

export let controller         =      null;

let input                     =      null;

let valueBefore               =      null;

$: if(input !== null) input.disabled = disabled;
$: if(input !== null) input.readOnly = readonly;

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
    "input": function (e) {
        //console.debug(e);

        if(disabled || readonly) {
            return;
        }

        if(value.length > maxLength) {
            value = valueBefore;

            return;
        }

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
    valueBefore = value;

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

        switch(key) {
            case "value":
                if(value.length > maxLength) {
                    return;
                }
            break;
        }

        $$props[key] = val;
    };
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-textfield"
    bind:this={controller}

    {layout}
    {state}
>
    <div class="swg-textfield-box">
        <div class="swg-textfield-content-extra swg-textfield-content-before">
            <slot name="content-before"></slot>
        </div>
        <div class="swg-textfield-content">
            <input type="text"
                bind:this={input}
                bind:value

                {placeholder}

                on:input={callbacks["input"]}
                on:blur={callbacks["blur"]}
                on:focus={callbacks["focus"]}
            >
            <div class="swg-textfield-label">
                {label}
            </div>
        </div>
        <div class="swg-textfield-content-extra swg-textfield-content-after">
            <slot name="content-after"></slot>
        </div>
    </div>
    <div class="swg-textfield-hint">
        {hint}
    </div>
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
    margin-bottom: 10px;
}

.swg-textfield-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    color: #515151;
    background-color: #e7e7e7;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
}

.swg-textfield-content-before {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.swg-textfield-content {
    position: relative;
    display: flex;
    flex-grow: 1;
}

.swg-textfield input {
    display: block;
    padding: 10px 16px;
    flex-grow: 1;
    font-weight: 500;
    font-size: 16px;
    border: 1px solid transparent;
    color: #515151;
    background-color: #ffffff;
}

.swg-textfield-label {
    padding: 0 4px;
    margin-top: 16px;
    position: absolute;
    z-index: 2;
    top: -24px;
    left: 10px;
    font-weight: 600;
    font-size: 10px;
    background-color: #ffffff;
    border-radius: 2px;
}

.swg-textfield-content-after {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.swg-textfield-content-extra {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    color: #ffffff;
    background-color: #00bd9c;
}

.swg-textfield-hint {
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 0 8px;
    font-weight: 500;
    font-size: 12px;
}

.swg-textfield[layout='T'] .swg-textfield-content-before,
.swg-textfield[layout='T'] .swg-textfield-content-after {
    display: none;
}

.swg-textfield[layout='T'] input {
    border-radius: 5px;
}

.swg-textfield[layout='BT'] .swg-textfield-content-after {
    display: none;
}

.swg-textfield[layout='BT'] input {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.swg-textfield[layout='TA'] .swg-textfield-content-before {
    display: none;
}
.swg-textfield[layout='TA'] input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    opacity: 1;
    color: #515151;
}
::-moz-placeholder { /* Firefox 19+ */
    opacity: 1;
    color: #515151;
}
:-ms-input-placeholder { /* IE 10+ */
    opacity: 1;
    color: #515151;
}
:-moz-placeholder { /* Firefox 18- */
    opacity: 1;
    color: #515151;
}

.swg-textfield input:focus {
    z-index: 1;
}

.swg-textfield[state='default'] input:hover {
    border-color: #e7e7e7;
}
.swg-textfield[state='default'] input:focus {
    border-color: #00ad8f;
    box-shadow: 0px 0px 4px 1px #00bd9c;
}
.swg-textfield[state='default'] .swg-textfield-label {
    color: #00ad8f;
}
.swg-textfield[state='default'] input:focus + .swg-textfield-label {
    color: #ffffff;
    background-color: #00ad8f;
}
.swg-textfield[state='default'] .swg-textfield-hint {
    color: #00ad8f;
}
.swg-textfield[state='default'] input::-moz-selection,
.swg-textfield[state='default'] input::selection {
    opacity: 1;
    color: #ffffff;
    background-color: #00ad8f;
}

.swg-textfield[state='danger'] input {
    border-color: #f06366;
    box-shadow: 0px 0px 4px 1px #ff696d;
}
.swg-textfield[state='danger'] .swg-textfield-label {
    color: #f06366;
}
.swg-textfield[state='danger'] input:focus {
    background-color: #ff696d5e;
}
.swg-textfield[state='danger'] input:focus + .swg-textfield-label {
    color: #ffffff;
    background-color: #f06366;
}
.swg-textfield[state='danger'] .swg-textfield-hint {
    color: #f06366;
}
.swg-textfield[state='danger'] input::-moz-selection,
.swg-textfield[state='danger'] input::selection {
    opacity: 1;
    color: #ffffff;
    background-color: #ff696d;
}

.swg-textfield[state='warning'] input {
    border-color: #f0a63c;
    box-shadow: 0px 0px 4px 1px #ffb140;
}
.swg-textfield[state='warning'] .swg-textfield-label {
    color: #f0a63c;
}
.swg-textfield[state='warning'] input:focus {
    background-color: #ffb1405e;
}
.swg-textfield[state='warning'] input:focus + .swg-textfield-label {
    color: #ffffff;
    background-color: #f0a63c;
}
.swg-textfield[state='warning'] .swg-textfield-hint {
    color: #f0a63c;
}
.swg-textfield[state='warning'] input::-moz-selection,
.swg-textfield[state='warning'] input::selection {
    opacity: 1;
    color: #ffffff;
    background-color: #ffb140;
}

.swg-textfield[state='info'] input {
    border-color: #298ccf;
    box-shadow: 0px 0px 4px 1px #2c97de;
}
.swg-textfield[state='info'] .swg-textfield-label {
    color: #298ccf;
}
.swg-textfield[state='info'] input:focus {
    background-color: #2c97de5e;
}
.swg-textfield[state='info'] input:focus + .swg-textfield-label {
    color: #ffffff;
    background-color: #298ccf;
}
.swg-textfield[state='info'] .swg-textfield-hint {
    color: #298ccf;
}
.swg-textfield[state='info'] input::-moz-selection,
.swg-textfield[state='info'] input::selection {
    opacity: 1;
    color: #ffffff;
    background-color: #2c97de;
}

</style>