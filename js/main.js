$(function () {

    // to store tile values
    var tile_values = [
    'A', 'A', 'B', 'B', 'C', 'C',
    'D', 'D', 'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H', 'I', 'I',
    'K', 'K', 'L', 'L'
    ]
        // to compare tile values
    var temp_values = [];
    // to store matched tile values
    var matched_values = [];
    var tiles_flipped = 0;

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
        // gives each div a unique tile number
        for (var i = 0; i < tile_values.length; i++) {
            $("#memory_board").append("<div class='tile' id='" + i + "'></div>");
        }
        console.log(tile_values);
    }

    newBoard();

    // on click change background and text of tile
    $(".tile").on("click", function () {
        $(this).css("background", "#fff").text(tile_values[$(this).attr("id")]);
        temp_values.push($(this).text());
        console.log(temp_values);
        // check if chosen tiles match
        if (temp_values.length === 2) {
            if (temp_values[0] !== temp_values[1]) {
                console.log("no match");
                temp_values.length = 0;
                
            } else {
                console.log("match");
                matched_values.push($(this).text());
                temp_values.length = 0;
                console.log(matched_values);
            }
        }
    }); // end of on click
}); // end of JQuery function