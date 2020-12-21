<script>

import { onMount } from 'svelte';

import SWGButton from './SWGButton.svelte';

export let controller = null;

let callbacks = {
    "swg-input": function (e) {
        //console.debug(e);

        controller.climbUntil("swg-textfield").querySelector("input").focus();
    }
};

onMount(function(e) {

});

</script>

<svelte:options accessors={true} />

<div class="swg swg-textfield-label"
    bind:this={controller}
>
    <SWGButton
        type="text"
        state="primary"
        on:swg-input={callbacks["swg-input"]}
    >
        <slot></slot>
    </SWGButton>
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

.swg-textfield-label {
    flex-grow: 1;
}

</style>