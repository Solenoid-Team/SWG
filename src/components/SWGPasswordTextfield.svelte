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
export let value        =        "";
export let placeholder  =        "";
export let hint         =        "";

let controller         =      null;
let textfield          =      null;
let input              =      null;
let button             =      null;

let layout = "TA";

let setIconFlag = function () {
    controller.querySelector(".swg-textfield-content-after")
    .setAttribute(
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

    textfield = controller.querySelector(".swg-textfield");
    button    = textfield.querySelector(".swg-button");
    input     = textfield.querySelector("input");

    input.type = "password";
    
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

                button.setData(
                    "state",
                    (state === "default") ? "primary" : state
                );
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
        <div class="swg-password-textfield-content-after" slot="content-after">
            <div class="icon-box">
                <SWGButton
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