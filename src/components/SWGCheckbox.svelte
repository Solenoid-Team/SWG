<script>

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let disabled   = false;
export let checked    = false;

export let label      =    "";

export let controller = null;
export let value      =   "";

let input             = null;

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
    "change": function (e) {
        if(disabled) {
            return;
        }

        let detail = {
            "controller": controller,
            "data": {
                "value"  : value,
                "checked": checked
            }
        };

        dispatchEvent(
            "swg-change",
            detail
        );
    }
};

$: if(input !== null) input.disabled = disabled;

onMount(function(e) {
    controller.getData = function (key) {
        const messagePrefix = "\n\nCannot get data:\n";
        let message = messagePrefix;

        let properties = {
            "disabled"  : disabled,
            "checked"   : checked,
            "label"     : label,

            "value"     : value
        };

        if(key === undefined) {
            return properties;
        }

        switch(key) {
            case "disabled":
            case "checked":
            case "label":
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
            case "label":
                label = val;
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

<label class="checkbox"
    bind:this={controller}

    {disabled}
>
    <div class="checkbox-body">
        <slot name="body"></slot>
    </div>
    <input type="checkbox"
        bind:this={input}

        bind:checked
        bind:value

        on:change={callbacks["change"]}
    >
    <div class="checkbox-footer">
        <div class="checkbox-emulator-box">
            <div class="checkbox-emulator">
                <slot name="emulator">
                    <i class="fas fa-check"></i>
                </slot>
            </div>
        </div>
        <div class="checkbox-label">
            <slot name="label">
                {label}
            </slot>
        </div>
    </div>
</label>

<style>

.checkbox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.checkbox,
.checkbox * {
    user-select: none;
}

.checkbox-body {
    
}

input {
    display: none;
}

.checkbox-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.checkbox-emulator-box {
    width: 28px;
    height: 28px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.checkbox-emulator {
    font-size: 16px;
    color: #ffffff;
}

input:not(:checked) + .checkbox-footer .checkbox-emulator-box {
    background-color: #e7e7e7;
}

input:not(:checked) + .checkbox-footer .checkbox-emulator {
    visibility: hidden;
}

input:checked + .checkbox-footer .checkbox-emulator-box {
    background-color: #00bd9c;
}

input:checked + .checkbox-footer .checkbox-emulator {
    visibility: visible;
}

.checkbox-label {
    margin-left: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #515151;
}

</style>