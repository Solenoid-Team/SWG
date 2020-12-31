<script>

/*
    Dependencies:
        HTMLUtility.js
        SWGTextfield.svelte
        SWGButton.svelte
*/

import { onMount } from 'svelte';

import SWGTextfield from './SWGTextfield.svelte';
import SWGButton from './SWGButton.svelte';

export let state        = "default";

export let disabled     =     false;
export let readonly     =     false;

export let label        =        "";
export let maxLength    =      null;
export let placeholder  =        "";
export let hint         =        "";

export let controller   =      null;
export let value        =        "";

let textfield          =      null;
let input              =      null;
let button             =      null;

let setIconFlag = function () {
    controller.querySelector(".swg-textfield-content-after")
    .setAttribute(
        "icon",
        true
    );
};

let callbacks = {
    "change": function (e) {
        //console.debug(e.detail.data);

        input.type = e.detail.data.value;

        let icon = button.querySelector("i");

        switch(input.type) {
            case "text":
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            break;
            case "password":
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            break;
        }
    }
};

onMount(function(e) {
    setIconFlag();

    input = textfield.querySelector("input");

    input.type = "password";

    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        let properties = {
            "state"       : state,
            "disabled"    : disabled,
            "readonly"    : readonly,
            "label"       : label,
            "maxLength"   : maxLength,
            "placeholder" : placeholder,
            "hint"        : hint,

            "value"       : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "state":
            case "disabled":
            case "readony":
            case "label":
            case "maxLength":
            case "placeholder":
            case "hint":
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
            case "state":
                state = val;

                textfield.setData(
                    "state",
                    state
                );
            break;
            case "disabled":
                disabled = val;
            break;
            case "readonly":
                readonly = val;
            break;
            case "label":
                label = val;
            break;
            case "maxLength":
                maxLength = val;
            break;
            case "placeholder":
                placeholder = val;
            break;
            case "hint":
                hint = val;
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

    button.delegateFor(
        "",
        [
            "swg-input",
            "swg-change",
            "swg-focuschange"
        ],
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-password-textfield"
    bind:this={controller}
>
    <SWGTextfield
        bind:controller={textfield}
        bind:value

        bind:state
        bind:disabled
        bind:readonly
        bind:label
        bind:maxLength
        bind:placeholder
        bind:hint

        layout="TA"

        on:swg-input
        on:swg-change
        on:swg-focuschange
    >
        <div class="swg-password-textfield-content-after" slot="content-after">
            <div class="icon-box">
                <SWGButton
                    bind:controller={button}

                    type="text"
                    state="primary"
                    values={["text","password"]}
                    on:swg-change={callbacks.change}
                >
                    <i class="fas fa-eye"></i>
                </SWGButton>
            </div>
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

.swg-password-textfield {

}

.swg-password-textfield :global(.swg-textfield-content-extra[icon='true']) {
    padding: 0;
    background-color: transparent;
}

.swg-password-textfield .icon-box {
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
}

.swg-password-textfield :global(
    .swg-textfield-content-before .icon-box .swg-button
) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.swg-password-textfield :global(
    .swg-textfield-content-after .icon-box .swg-button
) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.swg-password-textfield .icon-box :global(.swg-button i) {
    font-size: 24px;
}

.swg-password-textfield :global(
    .swg-textfield-content-before:hover + .swg-textfield-content input
) {
    border-color: #e7e7e7;
}

</style>