(function (window) {

    let App = window.App || {};

    let Validation = {
        isCompanyEmail : function (email) {
           return /.+@bignerdranch\.com$/.test(email);
        },

        isDecaf : function (a, b) {
            if (a == 'decaf' && b >= 20) {
                return false;
            }
            return true;
        }
    };

    App.Validation = Validation;
    window.App = App;

})(window);