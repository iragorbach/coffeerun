(function (window) {
    let App = window.App || {};
    let $ = window.jQuery;

    function Checklist(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    Checklist.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            let email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    Checklist.prototype.addDblClickHandler = function(){

    };

    Checklist.prototype.addRow = function (coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);

        let rowElement = new Row(coffeeOrder);

        this.$element.append(rowElement.$element);
    };

    Checklist.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    function Row(coffeeOrder) {
        let $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox',
            'id': 'pending-orders'
        });

        let $label = $('<label></label>');

        let $checkbox = $('<input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        let description = coffeeOrder.size + ' ';

        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x], ';

        if (coffeeOrder.chosenAcheivement) {
            description += coffeeOrder.chosenAcheivement;
        }

        $div.addClass(coffeeOrder.flavor);

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;

    }

    App.Checklist = Checklist;
    window.App = App;

})(window);
