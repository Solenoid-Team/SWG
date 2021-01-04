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

export let disabled    =  false;
export let placeholder =   null;

export let controller  =   null;
export let value       =   null;

let values             =     [];

let radioGroup         =   null;

let state              = "down";

let timeout            =   null;
let searchStream       =   null;

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
   "keydown": function (e) {
        window.clearTimeout(timeout);

        if(searchStream === null) {
            searchStream = "";
        }

        timeout = window.setTimeout(
            function() {
                searchStream = "";
            },
            1000
        );

        searchStream += e.key.toLowerCase();
        
        //console.debug(searchStream);

        for(let i = 0; i < values.length; i++) {
            let element = values[i];

            let val = element.value.toLowerCase();

            if(val.indexOf(searchStream) !== -1) {
                element.controller.climbUntil("swg-select-item").focus();

                break;
            }
        }
   }
};

onMount(function(e) {
    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        let properties = {
            "disabled"  : disabled,
            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "disabled":
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

    on:keydown={callbacks["keydown"]}
>
    <div class="swg-select-box-current-value">
        <SWGButton
            bind:value={state}

            bind:disabled

            type="text"
            state="secundary"

            values={["up","down"]}
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

            bind:values

            on:swg-change
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