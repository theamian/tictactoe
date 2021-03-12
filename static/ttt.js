$(function() {

    const Player = function() {
        let symbol = "";
        let name = "";
        const setSymbol = (sym) => symbol = sym;
        const saySymbol = () => symbol;
        const setName = (id) => name = id;
        const sayName = () => name;

        return {setSymbol, saySymbol, sayName, setName};
    };

    const p1 = Player();
    const p2 = Player();

    const board = (function() {
        //array represents the tic tac toe board per instructions
        let arr = [0,1,2,3,4,5,6,7,8];
        //mark function to place the X or O symbol at the specified index of the array
        const mark = (field, symbol) => {
            arr[field] = symbol;
        };

        const giveLineStr = (index, step) => {
            return [arr[index], arr[index + step], arr[index + step*2]].join("");
        };

        const giveBoard = () => arr;
    
        return {mark, giveLineStr, giveBoard}
    })();
    
    const game = (function() {
        let active = p1;

        // to switch between who's turn is to play next as well as to toggle the styling
        const _toggle = () => {
            if(active === p1) active = p2;
            else active = p1;
            $("#p1").toggleClass("active").toggleClass("inactive");
            $("#p2").toggleClass("active").toggleClass("inactive");
            }

        // check for victory conditions
        const _chkwin = () => {
            let str = active.saySymbol().repeat(3); //helper string (either XXX or OOO) to compare against the board

            for(let i=0; i<3;i++) {
                if(str === board.giveLineStr(i,3)) return true; //checks for three in a column
            }
            for(let i=0; i<9; i+=3) {
                if(str === board.giveLineStr(i,1)) return true; //checks for three in a row
            }
            for(let i=0;i<3;i+=2) {
                if(str === board.giveLineStr(i, 4-i)) return true; //checks for three in a diagonal
            }
        }
        
        //if victory achieved
        const _victory = () => {
            $("#nameBoard").toggleClass("hidden");
            $(".gridCont").toggleClass("hidden");
            $("#message").text(`${active.sayName()} wins`).toggleClass("hidden");
        }

        //check for a tie
        const _chktie = () => {
            let brd = board.giveBoard();
            for(let i=0; i<brd.length; i++){
                if(brd[i] !== "X" && brd[i] !== "O") {
                    return false;
                }
            }
            return true;
        };

        //if tie
        const _draw = () => {
            $("#nameBoard").toggleClass("hidden");
            $(".gridCont").toggleClass("hidden");
            $("#message").text("it's a draw :/").toggleClass("hidden");
        };

        // what happens after a click on a field
        const turn = (field) => {
            board.mark(field, active.saySymbol());
            $(`#${field}`).off("click");
            $(`#${field}`).append($("<div></div>").text(active.saySymbol()).addClass("symbol"));
            if(_chkwin()) setTimeout(_victory, 1000);
            else if(_chktie()) _draw();
            else _toggle();
        }
        return {turn}
    })();
    
    // empties input boxes
    const clean = () => {
        $("#player1").val("");
        $("#player2").val("");
    }

    // draws the grid
    const lines = () => {
        $("div").filter(function() {
            return this.id.match(/^[012345]$/);
        }).addClass("bottomBorder");
        $("div").filter(function() {
            return this.id.match(/^[013467]$/);
        }).addClass("rightBorder");
    }

    const kickoff = () => {
        lines();
        if($("#player1").val() === "") $("#player1").val("player1");
        if($("#player2").val() === "") $("#player2").val("player2");
        $(".gridCont").removeClass("hidden");
        $("#p1").text($("#player1").val());
        $("#p2").text($("#player2").val());
        $("#nameForm").addClass("hidden");
        $("#nameBoard").removeClass("hidden");

        p1.setName($("#player1").val());
        p1.setSymbol("X");
        p2.setName($("#player2").val());
        p2.setSymbol("O");

        $("#p1").addClass("active");
        $("#p2").addClass("inactive");
    }

    // begin:

    clean();
    $("#submitBtn").click(kickoff);
    $(".gridCont > div").click(function() {
        game.turn(this.id);
    }); // end grid click


}); //close jquery ready

