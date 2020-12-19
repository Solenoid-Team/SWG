<script>

/*
    Dependencies:
        HTMLUtility.js
*/

import { onMount } from "svelte";

export let object = "";

export let type        = "container";
export let layout      = "T";
export let disabled    = false;

export let value       = "";
export let placeholder = "";
export let hint        = "";

let controller = null;
let input      = null;

$: dropValue = value;

let getValue = function (e) {
    let currentValue = e.srcElement.value;

    let currentValueArray = currentValue.split("");

    let selectionLength = e.target.selectionEnd - e.target.selectionStart;

    /*currentValueArray.splice(
        e.target.selectionStart,
        selectionLength,
        replacement
    );*/

    let index       = null;
    let numElements = null;

    if(e.key !== undefined && e.key === "Backspace" && selectionLength === 0) {// KeyDown
        index = (e.target.selectionStart - 1);

        if(index < 0) {
            index = 0;
        }

        numElements = 1;
    } else {// KeyPress
        index = e.target.selectionStart;

        numElements = selectionLength;
    }

    let replacement = null;

    if(e.key !== undefined) {
        if(e.key === "Backspace") {// KeyDown
            replacement = "";
        } else {// KeyPress
            replacement = e.key;
        }
    } else {
        if(e.clipboardData !== undefined) {// Paste
            replacement = e.clipboardData.getData("Text");
        }

        else

        if(e.dataTransfer !== undefined) {// Drop
            replacement = e.dataTransfer.getData("Text");
        }
    }

    currentValueArray.splice(
        index,
        numElements,
        replacement
    );

    let newValue = currentValueArray.join("");

    return newValue;
}

let callbacks = {
    "keydown": function (e) {
        //console.debug(e);

        if(e.key !== "Backspace") {
            return;
        }

        let valueBefore = e.srcElement.value;
        let valueAfter = getValue(e);

        let data = {
            "value": valueAfter
        };

        controller.triggerEvent(
            "swg-input",
            data
        );

        if(valueAfter !== valueBefore) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }
    },
    "keypress": function (e) {
        //console.debug(e);

        let valueBefore = e.srcElement.value;
        let valueAfter = getValue(e);

        let data = {
            "value": valueAfter
        };

        controller.triggerEvent(
            "swg-input",
            data
        );

        if(valueAfter !== valueBefore) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }
    },
    "cut": function (e) {
        //console.debug(e);

        let valueBefore = e.srcElement.value;
        let valueAfter = getValue(e);

        let data = {
            "value": valueAfter
        };

        controller.triggerEvent(
            "swg-input",
            data
        );

        if(valueAfter !== valueBefore) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }
    },
    "paste": function (e) {
        //console.debug(e);

        let valueBefore = e.srcElement.value;
        let valueAfter = getValue(e);

        let data = {
            "value": valueAfter
        };

        controller.triggerEvent(
            "swg-input",
            data
        );

        if(valueAfter !== valueBefore) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }
    },
    "drop": function (e) {
        //console.debug(e);
        
        let valueBefore = e.srcElement.value;
        
        window.setTimeout(
            function() {
                let valueAfter = e.target.value;

                let data = {
                    "value": valueAfter
                };

                controller.triggerEvent(
                    "swg-input",
                    data
                );

                if(valueAfter !== valueBefore) {
                    controller.triggerEvent(
                        "swg-change",
                        data
                    );
                }
            },
            500
        );
    }
};

onMount(function(e) {
    controller.getData = function (key) {
        let messagePrefix = "\n\nCannot get data:\n\n";
        let message = messagePrefix;

        switch(key) {
            case "disabled":
                return disabled;
            break;
            case "value":
                return input.value;
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
            break;
            case "value":
                input.value = value;
            break;
            default:
                message += "\nArgument 'key':";
                message += "\nValue is not recognized";
                message += "\n\n";

                throw new Error(message);
        }
    }

    // TEST::START

    controller.delegateFor(
        "",
        "swg-change",
        function(e) {return;
            console.debug("Event '" + e.originalEvent.type + "' on 'SWGTextfield'");
            console.debug(e.data);
            console.debug("\n");
        }
    );

    // TEST::END
});

</script>

<div class="swg swg-textfield" bind:this={controller} {object} {type} {layout} {disabled}>
    <div class="swg-textfield-box">
        <div class="swg-textfield-content-before">
            <slot name="content-before"></slot>
        </div>
        <input type="text" bind:this={input} bind:value={value} {placeholder}
            on:keydown={callbacks.keydown}
            on:keypress={callbacks.keypress}
            on:cut={callbacks.cut}
            on:paste={callbacks.paste}
            on:drop={callbacks.drop}

            on:input={inputCallback}
        >
        <div class="swg-textfield-content-after">
            <slot name="content-after"></slot>
        </div>
    </div>
    <div class="swg-textfield-hint">
        {hint}
    </div>
</div>

<style>

.swg {

}

.swg,
.swg * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: "Montserrat";
}

.swg-textfield {
    
}

.swg-textfield-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    color: #515151;
    background-color: #e7e7e7;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
}

.swg-textfield-content-before {

}

.swg-textfield > .swg-textfield-box > input {
    display: block;
    padding: 10px 16px;
    flex-grow: 1;
    font-weight: 500;
    font-size: 16px;
    border: 1px solid transparent;
    color: #515151;
    background-color: #ffffff;
}

.swg-textfield-content-after {

}

.swg-textfield-content-before,
.swg-textfield-content-after {
    height: 100%;
}

.swg-textfield-hint {
    width: 100%;
    height: 20px;
    color: red;
}

.swg-textfield[layout='T'] .swg-textfield-content-before,
.swg-textfield[layout='T'] .swg-textfield-content-after {
    display: none;
}

.swg-textfield[layout='T'] input {
    border-radius: 5px;
}

.swg-textfield[layout='BT'] .swg-textfield-content-after {
    display: none;
}

.swg-textfield[layout='BT'] input {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.swg-textfield[layout='TA'] .swg-textfield-content-before {
    display: none;
}
.swg-textfield[layout='TA'] input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.swg-textfield input:focus {
    border-color: #00ad8f;
    box-shadow: 0px 0px 4px 1px #00bd9c;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    opacity: 1;
    color: #515151;
}
::-moz-placeholder { /* Firefox 19+ */
    opacity: 1;
    color: #515151;
}
:-ms-input-placeholder { /* IE 10+ */
    opacity: 1;
    color: #515151;
}
:-moz-placeholder { /* Firefox 18- */
    opacity: 1;
    color: #515151;
}

</style>