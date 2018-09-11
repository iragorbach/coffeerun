(function (window) {
    let App = window.App || {};
    let $ = window.jQuery;
    let strengthInput = document.getElementById("strengthLevel");
    let isModalShown = false;

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
        let data = {};

            this.$formElement.on('submit', function (event) {

                event.preventDefault();

                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });

                console.log(checkAchievement(data));

                if (checkAchievement(data) && isModalShown == false) {
                    $('#myModal').modal('show');
                } else {
                    this.reset();

                    fn(data);
                    changeValue(strengthInput.value);
                    this.elements[0].focus();
                }
            });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            let emailAddress = event.target.value;
            let message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        })
    };
    
    FormHandler.prototype.addCaffeineCheck = function (fn) {
        this.$formElement.on('input', '[id="strengthLevel"]', function (event) {
            let coffeeStrength = document.getElementById('strengthLevel').value;
            let coffeeName = document.getElementById('coffeeOrder').value;
            let message = '';
            if (!fn(coffeeName, coffeeStrength)){
                message = 'You can not choose ' + coffeeStrength + ' strength for decaf coffee';
                event.target.setCustomValidity(message);
            } else {
                event.target.setCustomValidity('');
            }

        })
    }

    FormHandler.prototype.confirmAchievement = function (e, email) {
        e.preventDefault();
        const container = document.getElementById('achievement-container');
        const field =
            '<label for="achievementInput">Choose your achievement</label>\n' +
            '<select name="chosenAcheivement" id="achievementInput" class="form-contol">\n' +
            '<option value="">None</option>\n' +
            '<option value="time-travel">Time travel</option>\n' +
            '<option value="minds-reading">Minds reading</option>\n' +
            '<option value="clear-code">Clear code</option>\n' +
            '</select>';

        if (email != '') {
            container.innerHTML = field;
            isModalShown = true;
        }
        $('#myModal').modal('hide');
    };

    function checkAchievement(data) {
        const neededStrength = 100;
        const neededSize = 'coffee-zilla';

        if (
            data.strength == neededStrength &&
            data.size == neededSize
        ) {
            return true;
        }
            return false;
    }

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

    strengthInput.addEventListener("input", function () {
        changeValue(this.value);
    });

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
