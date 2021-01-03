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

});

</script>

<label class="checkbox"
    bind:this={controller}
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

input:checked + .checkbox-footer .checkbox-emulator-box {
    background-color: #00bd9c;
}

input:not(:checked) + .checkbox-footer .checkbox-emulator-box {
    background-color: #e7e7e7;
}

input:checked + .checkbox-footer .checkbox-emulator {
    visibility: visible;
}

input:not(:checked) + .checkbox-footer .checkbox-emulator {
    visibility: hidden;
}

.checkbox-label {

}

</style>