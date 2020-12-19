<script>
import { onMount } from "svelte";

export let label   = "Value";

export let value   = 0;

export let step    = 1;

export let min     = -Infinity;
export let max     = +Infinity;

export let object = "";

let valueBefore = value;

$: value = parseInt(value);

$: step = parseInt(step);

$: min = parseInt(min);
$: max = parseInt(max);

let decrementNumber = function () {
    let valueBefore = value;
    let valueAfter  = valueBefore;

    valueAfter -= step;

    if(valueAfter < min) {
        valueAfter = min;
    }

    value = valueAfter;

    controller.triggerEvent(
        "swg-input",
        {
            "value": valueAfter
        }
    );

    controller.triggerEvent(
        "swg-decrement",
        {
            "valueBefore": valueBefore,
            "valueAfter":  valueAfter
        }
    );

    if(valueAfter !== valueBefore) {
        controller.triggerEvent(
            "swg-change",
            {
                "value": valueAfter
            }
        );
    }
}

let incrementNumber = function () {
    let valueBefore = value;
    let valueAfter  = valueBefore;

    valueAfter += step;

    if(valueAfter > max) {
        valueAfter = max;
    }

    value = valueAfter;

    controller.triggerEvent(
        "swg-input",
        {
            "value": value
        }
    );

    controller.triggerEvent(
        "swg-increment",
        {
            "valueBefore": valueBefore,
            "valueAfter":  valueAfter
        }
    );

    if(valueAfter !== valueBefore) {
        controller.triggerEvent(
            "swg-change",
            {
                "value": value
            }
        );
    }
}

let callbacks = {
    "keydown": function (e) {
        //console.debug(e);

        valueBefore = value;

        switch(e.key) {
            case "ArrowDown":
            case "ArrowLeft":
                decrementNumber();
            break;
            case "ArrowUp":
            case "ArrowRight":
                incrementNumber();
            break;
            case "Backspace":
                if(value.toString().length === 1) {
                    e.preventDefault();

                    value = min;
                }
            break;
        }
    },
    "keypress": function (e) {
        //console.debug(e);

        let currentValue = e.srcElement.value;

        let currentValueArray = currentValue.split("");

        currentValueArray.splice(
            e.target.selectionStart,
            (e.target.selectionEnd - e.target.selectionStart),
            e.key
        );

        let newValue = currentValueArray.join("");

        newValue = parseInt(newValue);

        let data = {
            "value": newValue
        };
        
        controller.triggerEvent(
            "swg-input",
            data
        );

        if(newValue !== currentValue) {
            controller.triggerEvent(
                "swg-change",
                data
            );
        }
    },
    "wheel": function (e) {
        if(this === document.activeElement) {
            e.preventDefault();

            //console.debug(e);

            if(e.deltaY < 0) {
                incrementNumber();
            } else {
                decrementNumber();
            }
        }
    }
};

let controller = null;
let input      = null;

onMount(function(e) {
    controller.getData = function (key) {
        switch(key) {
            case "value":
                return parseInt(input.value);
            break;
            default:
                return null;
        }
    }

    controller.setData = function (
        key,
        value
    ) {
        switch(key) {
            case "value":
                input.value = value;
            break;
            default:
                return false;
        }

        return true;
    }
});

</script>

<div class="swg swg-textfield swg-textfield-number" bind:this={controller} {object}>
    <div class="btn btn-minus" role=button tabindex=0 on:click={decrementNumber}>-</div>
    <div class="box">
        <div class="box-label">
            {label}
        </div>
        <input type="text" class="box-value" tabindex=0 bind:this={input} bind:value={value}
            on:keydown={callbacks.keydown}
            on:keypress={callbacks.keypress}
            on:wheel={callbacks.wheel}
        >
    </div>
    <div class="btn btn-plus" role=button tabindex=0 on:click={incrementNumber}>+</div>
</div>

<style>

.swg {

}

.swg-textfield {

}

.swg-textfield-number {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btn-minus {

}

.box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #0084ff;
    border-radius: 5px;
}

.box-label {
    padding: 6px 18px;
}

.box-value {
    width: 60px;
    padding: 6px 10px;
    border: none;
    border-left: 1px solid #0084ff;
    text-align: center;
}

.btn-plus {

}

.btn {
    width: 20px;
    height: 20px;
    padding: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #0084ff;
    border: 1px solid #0084ff;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

</style>