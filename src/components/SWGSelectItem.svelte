<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGRadio.svelte
*/

import { onMount } from 'svelte';

import SWGRadio from './SWGRadio.svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let disabled   = false;
export let checked    = false;

export let controller = null;
export let value      =   "";

let radio             = null;

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

<div class="swg swg-select-item"
    bind:this={controller}
>
    <SWGRadio
        bind:controller={radio}
        bind:value

        bind:disabled
        bind:checked

        on:swg-change
        on:swg-focuschange
    >
        <div slot="body"></div>
        <div class="swg-select-item-label" slot="label">
            <slot name="label"></slot>
        </div>
        <div slot="emulator"></div>
    </SWGRadio>
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

.swg-select-item {

}

.swg-select-item-label {
    
}

</style>