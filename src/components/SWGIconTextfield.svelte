<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGTextfield.svelte
        SWGTextfieldLabel.svelte
*/

import { onMount } from 'svelte';

import SWGTextfield from './SWGTextfield.svelte';
import SWGTextfieldLabel from './SWGTextfieldLabel.svelte';

export let layout       =       "T";
export let state        = "default";

export let disabled     =     false;
export let readonly     =     false;

export let label        =        "";
export let maxLength    = +Infinity;
export let value        =        "";
export let placeholder  =        "";
export let hint         =        "";

export let iconPosition =    "left";

let controller         =      null;
let textfield          =      null;
let textfieldLabel     =      null;
let input              =      null;
let button             =      null;

let positionMap = {
    "left" : "before",
    "right": "after"
};

let setIconFlag = function () {
    textfield.querySelector(".swg-textfield-content-extra").setAttribute(
        "icon",
        null
    );

    textfield.querySelector(
        ".swg-textfield-content-" + positionMap[iconPosition]
    ).setAttribute(
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
        "maxLength",
        maxLength
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
};

onMount(function(e) {
    setIconFlag();

    button    = textfieldLabel.querySelector(".swg-button");
    input     = textfield.querySelector("input");
    
    setTextfieldData();

    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        if(key === undefined) {
            return $$props;
        }

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
        const messagePrefix = "\n\nCannot set data:\n";
        let message = messagePrefix;

        if($$props[key] === undefined || key === "controller") {
            message += "\nProperty '" + key + "' is not recognized";
            message += "\n\n";

            throw new Error(message);
        }

        textfield.setData(
            key,
            val
        );

        switch(key) {
            case "state":
                textfield.querySelectorAll(".swg-button")
                .forEach(function(element) {
                    element.setData(
                        "state",
                        (state === "default") ? "primary" : state
                    );
                });
            break;
            case "iconPosition":
                setIconFlag();
            break;
        }
    };

    button.delegateFor(
        "",
        "swg-focuschange",
        function(e) {
            //e.originalEvent.stopPropagation();
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-icon-textfield"
    bind:this={controller}
>
    <SWGTextfield
        bind:controller={textfield}

        bind:layout
        bind:state
        bind:disabled
        bind:readonly
        bind:label
        bind:maxLength
        bind:value
        bind:placeholder
        bind:hint
    >
        <div class="swg-icon-textfield-content-before" slot="content-before">
            {#if iconPosition === "left"}
                <div class="icon-box">
                    <SWGTextfieldLabel
                        bind:controller={textfieldLabel}
                    >
                        <slot name="left"></slot>
                    </SWGTextfieldLabel>
                </div>
            {:else}
                <slot name="left"></slot>
            {/if}
        </div>
        <div class="swg-icon-textfield-content-after" slot="content-after">
            {#if iconPosition === "right"}
                <div class="icon-box">
                    <SWGTextfieldLabel
                        bind:controller={textfieldLabel}
                    >
                        <slot name="right"></slot>
                    </SWGTextfieldLabel>
                </div>
            {:else}
                <slot name="right"></slot>
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

.swg-icon-textfield {

}

.swg-icon-textfield :global(.swg-textfield-content-extra[icon='true']) {
    padding: 0;
    background-color: transparent;
}

.swg-icon-textfield .icon-box {
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-icon-textfield .icon-box :global(.swg-button) {
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-icon-textfield .swg-icon-textfield-content-before .icon-box :global(.swg-button) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.swg-icon-textfield .swg-icon-textfield-content-after .icon-box :global(.swg-button) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.swg-icon-textfield .icon-box :global(.swg-button i) {
    font-size: 24px;
}

.swg-icon-textfield :global(
    .swg-textfield-content-before:hover + .swg-textfield-content input
) {
    border-color: #e7e7e7;
}

</style>