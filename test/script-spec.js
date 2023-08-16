const expect = require("chai").expect;
const { JSDOM } = require("jsdom");

describe('Solution', function () {
    before(function () {
        return JSDOM.fromFile('./solution/index.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
            });
    });
    it("should have 1 form element in index.html", function () {
        const form = document.getElementsByTagName("form")[0];
        expect(form).not.to.be.undefined;
    });
    it("should have form with input type elements for capturing order id, customer name," +
        "email, contact number, order date and total amount", function () {
            const inputElements = document.getElementsByTagName("input");
            expect(inputElements.length).to.be.greaterThanOrEqual(6);
        });
    it("should contain button with text `+` to add order items", function () {
        const addOrderButton = document.getElementsByTagName("button")[0];
        expect(addOrderButton.innerHTML).to.contain("+");
    });
    it("should have function with the name `submitOrder`", function () {
        const submitOrder = require("../solution/js/script");
        expect(typeof submitOrder).to.be.equal("function");
    });
});