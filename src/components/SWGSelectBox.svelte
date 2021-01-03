<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGSelectBox.svelte
*/

import { onMount } from 'svelte';

import SWGRadioGroup from './SWGRadioGroup.svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let placeholder = null;

export let controller  = null;
export let value       = null;

let radioGroup         = null;

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
            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
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

<div class="swg swg-select-box"
    bind:this={controller}
>
    <div class="swg-select-box-current-value">
        {#if value === null}
            {placeholder}
        {:else}
            {value}
        {/if}
    </div>
    <SWGRadioGroup
        bind:controller={radioGroup}
        bind:value
    >
        <slot></slot>
    </SWGRadioGroup>
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

.swg-select-box {

}

.swg-select-box-current-value {

}

</style>