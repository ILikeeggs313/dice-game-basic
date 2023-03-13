import React from "react";
import { render, asFragment } from "@testing-library/react";
import Cell from "./Cell";

//describe the general test here
describe("Testing rendering of the cell component", () => {
    let container;
    //let's add a beforeEach
    beforeEach( ()=> {
        let tr = document.createElement("tr");
        container = document.body.appendChild(tr);
    });



    //a basic smoke test to see if it renders without crashing
    test("renders without crashing", () => {
        render(< Cell />, {container})
    })

    //test if it matches snapshot when the board is lit up
    test("matches snapshot as lit up", () => {
        const {asFragment} = render(<Cell isLit/>, {container});
        expect(asFragment()).toMatchSnapshot()
    })

    test("matches snapshot when not lit", () => {
        const {asFragment} = render(<Cell  />, {container})
        expect(asFragment()).toMatchSnapshot()
    })

})