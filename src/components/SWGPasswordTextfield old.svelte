<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGTextfield.svelte
        fontawesome-free-5.15.1-web
*/

import { onMount } from "svelte";

import SWGTextfield from './SWGTextfield.svelte';
import SWGButton from './SWGButton.svelte';

export let object      =               null;

export let state       =          "default";

export let disabled    =              false;
export let readonly    =              false;

export let label       =                 "";
export let maxLength   =          +Infinity;
export let value       =                 "";
export let placeholder =                 "";
export let hint        =                 "";

let controller         =               null;
let textfield          =               null;
let input              =               null;
let button             =               null;
let icon               =               null;

let valueBefore        =               null;
let valueAfter         =               null;

let iconClassName      =       "fas fa-eye";

onMount(function(e) {
    textfield = controller.querySelector(".swg-textfield");

    button = textfield.querySelector(".swg-button");

    input = textfield.querySelector("input");

    input.type = "password";
    
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

    //valueBefore = input.value;
    valueBefore = value;

    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
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
                return input.value;
            break;
            case "placeholder":
                return placeholder;
            break;
            case "hint":
                return hint;
            break;
            case "state":
                return state;
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
            case "maxLength":
                maxLength = value;

                textfield.setData(
                    "maxLength",
                    maxLength
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
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    button.delegateFor(
        "",
        [
            "swg-input",
            "swg-change"
        ],
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );
    
    button.delegateFor(
        "",
        "swg-input",
        function(e) {
            //console.debug(e);

            input.focus();

            input.setAttribute(
                "type",
                e.data.value
            );

            iconClassName = (e.data.value === "password" ? "fas fa-eye" : "fas fa-eye-slash");
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-textfield swg-password-textfield" bind:this={controller} {object}>
    <SWGTextfield layout="TA" {state}>
        <div class="icon-box" slot="content-after">
            <SWGButton class="icon-button" type="text" state="primary" values={["text","password"]}>
                <i bind:this={icon} class={iconClassName}></i>
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

.swg-password-textfield {

}

.icon-box {
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-password-textfield :global(.swg-textfield-content-after) {
    padding: 0 !important;
}

.swg-password-textfield .icon-box :global(.swg-button) {
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.swg-password-textfield .icon-box :global(.swg-button i) {
    font-size: 24px;
}

</style>