(function (window) {
    const formSelector = '[data-coffee-order="form"]';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let myTruck = new Truck('Галактика', new DataStore());
    window.myTruck = myTruck;
    let formHandler = new FormHandler(formSelector);

    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    console.log(formHandler);
})(window);
