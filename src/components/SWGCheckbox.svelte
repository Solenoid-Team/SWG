<script>

import { onMount } from "svelte";

export let object;

let controller = null;
let input = null;

onMount(function(e) {
    input.checked = false;
});

</script>

<div class="swg swg-checkbox" bind:this={controller} {object}>
    <label>
        <slot name="label"></slot>
        <input type="checkbox" bind:this={input}>
        <div class="swg-checkbox-emulator">
            ✓
        </div>
    </label>
</div>

<style>

.swg {

}

.swg-checkbox {

}

.swg-checkbox > label {

}

.swg-checkbox > label > input {
    display: none;
}

.swg-checkbox > label > input:checked + .swg-checkbox-emulator {
    visibility: visible;
}

.swg-checkbox > label > input:not(:checked) + .swg-checkbox-emulator {
    visibility: hidden;
}

</style>