$(function () {

    // to store tile values
    var tile_values = [
        "img/bicycle28.svg", 'img/bicycle28.svg',
        'img/flower11.svg', 'img/flower11.svg',
        'img/sharks.svg', 'img/sharks.svg',
        'img/umbrellas4.svg', 'img/umbrellas4.svg',
        'img/houses2.svg', 'img/houses2.svg',
        'img/drink151.svg', 'img/drink151.svg',
        'img/ice-creams2.svg', 'img/ice-creams2.svg',
        'img/star43.svg', 'img/star43.svg',
        'img/glasses40.svg', 'img/glasses40.svg',
        'img/fishing2.svg', 'img/fishing2.svg',
        'img/palm-tree.svg', 'img/palm-tree.svg',
        'img/shirt9.svg', 'img/shirt9.svg'
        ]
        /*    var tile_values = [
            'A', 'A', 'B', 'B', 'C', 'C',
            ]*/
        // to compare tile values
    var temp_values = [];
    var tiles_flipped = 0;
    var tile1;
    var tile2;

    // shuffle array 
    Array.prototype.shuffle = function () {
        var i = this.length,
            j, temp;
        if (i == 0) return this;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
        return this;
    }

    function newBoard() {
        // reset variables
        tiles_flipped = 0;
        temp_values.length = 0;
        tile_values.shuffle();
        tile1 = '';
        tile2 = '';
        $("#score").html("<p>Pairs Found: " + 0 + "</p>");
        // gives each div a unique tile number
        for (var i = 0; i < tile_values.length; i++) {
            $("#memory_board").append("<div class='tile' id='" + i + "'></div>");
        }
        console.log(tile_values);
    };
    newBoard();


    // on click change background and text of tile
    $(".tile").on("click", function () {
        if (temp_values.length < 2) {
            $(this).addClass("clicked").html("<img src='" + tile_values[$(this).attr("id")] + "'>");

            if (temp_values.length === 0) {
                tile1 = $(this).attr("id");
                temp_values.push($(this).html());
            } else if (temp_values.length === 1) {
                tile2 = $(this).attr("id");
                temp_values.push($(this).html());

                if (temp_values[0] === temp_values[1]) {
                    tiles_flipped += 2;
                    // clear temp array
                    temp_values.length = 0;
                    $("#" + tile1).addClass("matched").html();
                    $("#" + tile2).addClass("matched").html();


                    if (tiles_flipped === tile_values.length) {
                        alert("You win");
                        setTimeout(function () {
                            $("#memory_board").empty();
                            newBoard();
                        }, 1000)
                    }

                } else {
                    console.log("no matches");
                    setTimeout(function () {
                        $("#" + tile1).empty().removeClass("clicked");
                        $("#" + tile2).empty().removeClass("clicked");
                        temp_values.length = 0;
                    }, 800)
                }
            }
        }
        $("#score").html("<p>Pairs Found: " + tiles_flipped / 2 + "</p>");
    }); // end of on click

}); // end of JQuery function


/* Improvements

Add modal for winning.
Add flip library.*/