(function (window) {
    const formSelector = '[data-coffee-order="form"]';
    const checkListSelector = '[data-coffee-order="checklist"]';
    const SERVER_URL = "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders"

    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let Validation = App.Validation;
    let Checklist = App.Checklist;
    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('Галактика', remoteDS);
    window.myTruck = myTruck;
    let checklist = new Checklist(checkListSelector);
    checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    let formHandler = new FormHandler(formSelector);


    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checklist.addRow.call(checklist, data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    formHandler.addCaffeineCheck(Validation.isDecaf);
})(window);
