<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGButton.svelte
        SWGSelectBox.svelte
*/

import { onMount } from 'svelte';

import SWGButton from './SWGButton.svelte';
import SWGRadioGroup from './SWGRadioGroup.svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let placeholder =   null;

export let controller  =   null;
export let value       =   null;

let radioGroup         =   null;

let state              = "down";

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
    "swg-change": function (e) {

    }
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

    controller.delegateFor(
        ".swg-button",
        "swg-change",
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-select-box"
    bind:this={controller}

    on:keydown={()=>{}}
>
    <div class="swg-select-box-current-value">
        <SWGButton
            bind:value={state}

            type="text"
            state="secundary"

            values={["up","down"]}

            on:swg-change={callbacks["swg-change"]}
        >
            <div class="swg-select-box-current-value-text">
                {#if value === null}
                    {placeholder}
                {:else}
                    {value}
                {/if}
            </div>
            <div class="swg-select-box-current-value-symbol">
                <i class="fas fa-caret-{state}"></i>
            </div>
        </SWGButton>
    </div>
    <div class="swg-select-box-radio-group-wrapper"
        class:visible={state === "up"}
    >
        <SWGRadioGroup
            bind:controller={radioGroup}
            bind:value
        >
            <slot></slot>
        </SWGRadioGroup>
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

.swg-select-box {
    width: 100%;
    display: block;
    color: #515151;
    border-radius: 5px;
}

.swg-select-box-current-value {
    width: 100%;
    border-radius: inherit;
}

.swg-select-box-radio-group-wrapper {
    margin-top: 4px;
    padding: 12px 0;
    display: none;
    background-color: #e7e7e7;
    border-radius: inherit;
}

.swg-select-box-current-value :global(.swg-button) {
    width: 100%;
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.swg-select-box-current-value-text {
    display: table;
}

.swg-select-box-current-value-symbol {
    display: table;
}

.swg-select-box :global(.swg-radio-group) {
    
}

.visible {
    display: block;
}

</style>