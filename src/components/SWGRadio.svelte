<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGCheckbox.svelte
*/

import { onMount } from 'svelte';

import SWGCheckbox from './SWGCheckbox.svelte';

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

            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "disabled":
            case "checked":
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
        <div slot="emulator">
            <slot name="emulator">
                <div class="swg-radio-emulator-box">
                    <div class="swg-radio-emulator">
                        <i class="fas fa-circle"></i>
                    </div>
                </div>
            </slot>
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

.swg-radio {
    display: table;
}

.swg-radio-emulator-box {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
}

.swg-radio-emulator {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #ffffff;
}

.swg-radio :global(
    input:not(:checked) + .swg-checkbox-footer .swg-radio-emulator-box
) {
    background-color: #e7e7e7;
}
.swg-radio :global(
    input:not(:checked) + .swg-checkbox-footer .swg-radio-emulator
) {
    visibility: hidden;
}
.swg-radio :global(
    .swg-checkbox:focus input:not(:checked) + .swg-checkbox-footer .swg-radio-emulator-box
) {
    border-color: #e1e1e1;
    box-shadow: 0px 0px 4px 1px #cccccc;
}

.swg-radio :global(
    input:checked + .swg-checkbox-footer .swg-radio-emulator-box
) {
    background-color: #00bd9c;
}
.swg-radio :global(
    input:checked + .swg-checkbox-footer .swg-radio-emulator
) {
    visibility: visible;
}
.swg-radio :global(
    .swg-checkbox:focus input:checked + .swg-checkbox-footer .swg-radio-emulator-box
) {
    border-color: #00ad8f;
    box-shadow: 0px 0px 4px 1px #00bd9c;
}

.swg-radio :global(
    .swg-checkbox-label
) {
    margin-left: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #515151;
}

</style>