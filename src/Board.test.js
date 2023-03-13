import React from "react";
import { render, asFragment  } from "@testing-library/react";
import Board from "./Board";

describe("Testing rendering of board element, snapshots, etc.", () => {

    test("smoke test, rendering without crashing", () => {
        render(<Board />)
    });
    test("It matches board snapshot", () => {
        const {asFragment} = render(<Board chanceLightStartsOn={1}/>)
        expect(asFragment).toMatchSnapshot();
    })
    test("Shows win message when lights are out", () => {
        const {getByText} = render(<Board chanceLightStartsOn={0}/>)
        expect(getByText("You won !")).toBeInTheDocument;
    })
    test("Handle cell-clicking", () => {
        const { getAllByRole } = render(
            <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
        );
        const cells = getAllByRole("button");
  
        // all cells are lit up initially
        cells.forEach(cell => {
          expect(cell).toHaveClass("Cell-lit");
        });
  
        // click on the middle cell
        fireEvent.click(cells[4]);
  
        // now only cells at the corners should be lit
        let litIndices = [0, 2, 6, 8];
        cells.forEach((cell, idx) => {
          if (litIndices.includes(idx)) {
            expect(cell).toHaveClass("Cell-lit");
          } else {
            expect(cell).not.toHaveClass("Cell-lit");
          }
        });
    })
    test("Clicking the board causes the message saying you won to pop up", () => {
        const{queryByText, getAllByRole} = render(
            <Board nrows = {2} ncols = {3} chanceLightStartsOn = {1} />
        )
        //if the game isn't won
        expect(queryByText("You won !")).not.toBeInTheDocument();
    })    

})