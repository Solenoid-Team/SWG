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
let input              =      null;
let button             =      null;

let positionMap = {
    "left" : "before",
    "right": "after"
};

let setIconFlag = function () {
    controller.querySelector(".swg-textfield-content-extra").setAttribute(
        "icon",
        null
    );

    controller.querySelector(
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

    textfield = controller.querySelector(".swg-textfield");
    button    = textfield.querySelector(".swg-button");
    input     = textfield.querySelector("input");
    
    setTextfieldData();

    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "layout":
                return layout;
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
            case "maxLength":
                return maxLength;
            break;
            case "value":
                return value;
            break;
            case "placeholder":
                return placeholder;
            break;
            case "hint":
                return hint;
            break;
            case "iconPosition":
                return iconPosition;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    };

    controller.setData = function (
        key,
        val
    ) {
        let messagePrefix = "\n\nCannot set data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "layout":
                layout = val;

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

                textfield.querySelectorAll(".swg-button")
                .forEach(function(element) {
                    element.setData(
                        "state",
                        (state === "default") ? "primary" : state
                    );
                });
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
            case "maxLength":
                maxLength = val;

                textfield.setData(
                    "maxLength",
                    maxLength
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
            case "iconPosition":
                iconPosition = val;

                setIconFlag();
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    };

    button.delegateFor(
        "",
        "swg-focuschange",
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-icon-textfield"
    bind:this={controller}
>
    <SWGTextfield
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
                    <SWGTextfieldLabel>
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
                    <SWGTextfieldLabel>
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