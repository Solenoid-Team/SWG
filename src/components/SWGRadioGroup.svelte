<script>

/*
    Dependencies:
        HTMLUtility.js
*/

import { onMount } from 'svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let values     =   [];

export let controller = null;
export let value      = null;

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

let getValues = function () {
    let result = [];

    controller.querySelectorAll(".swg-checkbox").forEach(function(element) {
        result.push({
            "controller": element,
            "value"     : element.getData("value")
        });
    });

    return result;
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
        ".swg-radio",
        "swg-change",
        function(e) {
            //console.debug(e);

            e.originalEvent.stopPropagation();

            controller.querySelectorAll(".swg-radio")
            .forEach(function(element) {
                element.setData(
                    "checked",
                    false
                );
            });

            e.source.setData(
                "checked",
                e.info.data.checked
            );

            value = e.info.data.value;

            if(!e.info.data.checked) {
                value = null;
            }

            let detail = {
                "controller": controller,
                "data": {
                    "value": value
                }
            };

            dispatchEvent(
                "swg-change",
                detail
            );
        }
    );

    controller.delegateFor(
        ".swg-radio",
        "swg-focuschange",
        function(e) {
            e.originalEvent.stopPropagation();
        }
    );

    values = getValues();
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-radio-group"
    bind:this={controller}
>
    <slot></slot>
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

.swg-radio-group {
    width: 100%;
    display: block;
}

</style>