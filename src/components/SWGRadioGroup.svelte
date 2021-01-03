<script>

/*
    Dependencies:
        HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let disabled   = false;
export let checked    = false;

export let controller = null;
export let value      =   "";

let checkbox          = null;

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

onMount(function(e) {
    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        let properties = {
            "disabled"  : disabled,
            "checked"   : checked,
            "label"     : label,

            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "disabled":
            case "checked":
            case "label":
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
            case "disabled":
                disabled = val;
            break;
            case "checked":
                checked = val;
            break;
            case "label":
                label = val;
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
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-radio"
    bind:this={controller}
>
    <SWGCheckbox
        bind:controller={checkbox}
        bind:value

        bind:disabled
        bind:checked

        on:swg-change
        on:swg-focuschange
    >
        <div class="swg-radio-body" slot="body">
            <slot name="body"></slot>
        </div>
        <div class="swg-radio-label" slot="label">
            <slot name="label"></slot>
        </div>
    </SWGCheckbox>
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

.swg-checkbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.swg-checkbox,
.swg-checkbox * {
    user-select: none;
}

.swg-checkbox-body {
    
}

input {
    display: none;
}

.swg-checkbox-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-checkbox-emulator-box {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.swg-checkbox-emulator {
    font-size: 16px;
    color: #ffffff;
}

input:not(:checked) + .swg-checkbox-footer .swg-checkbox-emulator-box {
    background-color: #e7e7e7;
}
input:not(:checked) + .swg-checkbox-footer .swg-checkbox-emulator {
    visibility: hidden;
}
.swg-checkbox:focus input:not(:checked) + .swg-checkbox-footer .swg-checkbox-emulator-box {
    border-color: #e1e1e1;
    box-shadow: 0px 0px 4px 1px #cccccc;
}

input:checked + .swg-checkbox-footer .swg-checkbox-emulator-box {
    background-color: #00bd9c;
}
input:checked + .swg-checkbox-footer .swg-checkbox-emulator {
    visibility: visible;
}
.swg-checkbox:focus input:checked + .swg-checkbox-footer .swg-checkbox-emulator-box {
    border-color: #00ad8f;
    box-shadow: 0px 0px 4px 1px #00bd9c;
}

.swg-checkbox-label {
    margin-left: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #515151;
}

</style>