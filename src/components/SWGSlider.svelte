<script>

/*
 Dependencies:
    HTMLUtility.js
    SWGDraggable.svelte
*/

import { onMount } from 'svelte';

import SWGButton from './SWGButton.svelte';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let disabled     =        false;
export let orientation  = "horizontal";
export let controls     =        false;

export let minValue     =            0;
export let maxValue     =          100;
export let step         =            1;
export let values       =           [];

export let controller   =         null;
export let value        =         null;

let container           =         null;

let length              =         null;

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

let getValue = function (handler) {
    let x = handler.offsetLeft;

    let p =                     x;
    let t = container.offsetWidth;

    let percentage = (p / t) * 100;
    
    percentage = (percentage * length) / 100;

    percentage = Math.round(percentage);

    return percentage;
};

let setValue = function (
    handler,
    val
) {
    let percentage = (val * 100) / length;

    let p = (percentage / 100) * container.offsetWidth;

    let x = p;

    handler.style.left = x + "px";
};

let callbacks = {
    
};

$: minValue = parseFloat(minValue);
$: maxValue = parseFloat(maxValue);
$: step     = parseFloat(step);

$: length   = maxValue - minValue;

$: console.debug(values);

onMount(function(e) {    
    container.querySelectorAll(".swg-slider-handler")
    .forEach(function(
        element,
        index
    ) {
        element.toDraggable({
            "container": container,
            "handler"  : element
        });

        let val = values[index];

        let percentage = setValue(
            element,
            val
        );
    });

    container.delegateFor(
        "",
        "htmlutility-drag",
        function(e) {
            let element = e.info.element;

            let button = e.info.element.querySelector(".swg-button");

            let i = button.getData("value");

            let val = getValue(element);

            //console.debug(val);

            let index = (i + 1);

            let canMove = null;

            if((values.length % 2) === 0) {// Length is even
                if((index % 2) !== 0) {// Index is odd (range-start)
                    if(val >= values[i + 1]) {
                        val = values[i + 1];

                        setValue(
                            element,
                            val
                        );
                    }
                } else {// Index is even (range-end)
                    if(val <= values[i + 1]) {
                        val = values[i + 1];

                        setValue(
                            element,
                            val
                        );
                    }
                }
            }

            values[i] = val;
        }
    );
});

</script>

<svelte:options accessors={true} />

<div class="swg swg-slider"
    bind:this={controller}
>
    {#if controls}
        <div class="swg-slider-control swg-slider-control-decrement">
            <SWGButton
                type="text"
                state="primary"
            >
                -
            </SWGButton>
        </div>
    {/if}

    <div class="swg-slider-bar-wrapper"
        bind:this={container}
    >
        <div class="swg-slider-bar">
            {#each values as val, i}
                <div class="swg-slider-handler">
                    <SWGButton
                        type="text"
                        state="primary"

                        value={i}
                    >

                    </SWGButton>
                </div>
            {/each}
        </div>
    </div>

    {#if controls}
        <div class="swg-slider-control swg-slider-control-increment">
            <SWGButton
                type="text"
                state="primary"
            >
                +
            </SWGButton>
        </div>
    {/if}
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

.swg-slider {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-slider-control {

}

.swg-slider-control-decrement {

}

.swg-slider-bar-wrapper {
    width: 100%;
    height: 40px;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.swg-slider-bar {
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    background-color: #e7e7e7;
    border-radius: 5px;
}

.swg-slider-handler {
    height: 100%;
    display: table;
    position: relative;
    /*left: 0;
    top: -10px;*/
}

.swg-slider .swg-slider-handler :global(.swg-button) {
    width: 20px;
    height: 40px;
    margin: 0 !important;
    margin-left: -10px !important;
    padding: 0 !important;
    display: block;
}

.swg-slider-control-increment {

}

</style>