<script>

export let object = "";

export let onClose = null;

let controller = null;

let callbacks = {
    "click": function (e) {
        //console.debug(e);

        if(e.target === this) {
            onClose(this);
        }
    }
};

</script>

<div class="swg swg-dialog" bind:this={controller} on:click={callbacks.click} {object}>
    <div class="swg-dialog-box">
        <div class="swg-dialog-header">
            <slot name="header"></slot>
        </div>
        <div class="swg-dialog-body">
            <div class="swg-dialog-body-box">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</div>

<style>

.swg {

}

.swg-dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #00000099;
}

.swg-dialog-box {
    background-color: transparent;
}

.swg-dialog-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.swg-dialog-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.swg-dialog-body-box {
    width: 100%;
}

</style>