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
        let arr = [0,1,2,3,4,5,6,7,8];
        const mark = (field, symbol) => {
            arr[field] = symbol;
        };
    
        return {mark, arr}
    })();
    
    const game = (function() {
        let active = p1;
        const turn = (field) => {
            board.arr[field] = active.saySymbol();
            console.log(board.arr);
            $(`#${field}`).off("click");
            if(active === p1) active = p2;
            else active = p1;
        }
        return {turn}
    })();
    
    function clean() {
        $("#player1").val("");
        $("#player2").val("");
    }

    function kickoff() { // <-- WHEN THE GAME STARTS
        if($("#player1").val() === "") $("#player1").val("Player1");
        if($("#player2").val() === "") $("#player2").val("Player2");
        $(".gridCont").removeClass("hidden");
        $("#p1").text($("#player1").val());
        $("#p2").text($("#player2").val());
        $("#nameForm").addClass("hidden");
        $("#nameBoard").removeClass("hidden");

        p1.setName($("#player1").val());
        p1.setSymbol("X");
        p2.setName($("#player2").val());
        p2.setSymbol("O");
    }

    // BEGGINING OF THE "REAL" SHIT:

    clean();
    $("#submitBtn").click(kickoff);
    $(".gridCont > div").click(function() {
        game.turn($(this).attr("id"));
    }); // end grid click


}); //close jquery ready

