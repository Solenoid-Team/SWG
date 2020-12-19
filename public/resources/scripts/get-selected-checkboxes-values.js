let getSelectedCheckboxesValues = function (elementCheckboxesContainer) {
    let array = [];

    elementCheckboxesContainer.querySelectorAll("input[type='checkbox']").forEach(function(input) {
        if(input.checked) {
            array.push(input.value);
        }
    });

    return array;
};

export { getSelectedCheckboxesValues };