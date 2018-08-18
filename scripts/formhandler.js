(function (window) {
    let App = window.App || {};
    let $ = window.jQuery;
    let strengthInput = document.getElementById("strengthLevel");

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector)
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            let data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    function changeValue(value) {
        document.getElementById('strengthValue').innerHTML = value;
        let className = '';
        switch (true) {
            case value <= 33:
                className = 'green';
                break;
            case (value > 33) && (value < 66):
                className = 'orange';
                break;
            case value > 66:
                className = 'red';
                break;
        }
        document.getElementById('strengthValue').setAttribute('class', className);
    }

    changeValue(strengthInput.value);

    strengthInput.addEventListener("input", function() {
       changeValue(this.value);
    });

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
