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
        'img/helms.svg', 'img/helms.svg',
        'img/shirt9.svg', 'img/shirt9.svg'
        ]
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
        $("#board").empty();
        $(".tile").removeClass("transform");
        $("#score").html("<p>Pairs Found: " + 0 + "</p>");
        // gives each div a unique tile number and inserts images
        for (var i = 0; i < tile_values.length; i++) {
            $("#board").append("<div class='flip-container flip'>\
                    <div class='tile flipper' id='" + i + "'>\
                        <div class='front'></div>\
                        <div class='back'><img src='" +
                tile_values[i] + "'>\
                    </div>\
                </div>\
            </div>");
        }
        console.log(tile_values);
    };
    newBoard();

    // check if tiles match using a temporary array
    $("#board").on("click", ".tile", function () {
        console.log("clicked");
        // if tile hasn't been clicked already
        if (temp_values.length < 2 && !$(this).hasClass("transform")) {
            $(this).addClass("transform");
            // add tile1 to temporary array
            if (temp_values.length === 0) {
                tile1 = $(this).attr("id");
                temp_values.push($(this).find("img").attr("src"));
                // add tile2 to temporary array
            } else if (temp_values.length === 1) {
                tile2 = $(this).attr("id");
                temp_values.push($(this).find("img").attr("src"));
                // check if tile1 and tile2 in temp array match
                if (temp_values[0] === temp_values[1]) {
                    tiles_flipped += 2;
                    // clear temp array
                    temp_values.length = 0;
                    // end game condition
                    if (tiles_flipped === tile_values.length) {
                        setTimeout(function () {
                            $("#dialog").dialog({
                                modal: true,
                                close: function () {
                                    console.log("complete")
                                    newBoard();
                                }
                            });
                        }, 1000)
                    }
                } else {
                    // reset temp array if tiles didn't match
                    setTimeout(function () {
                        $("#" + tile1).removeClass("transform");
                        $("#" + tile2).removeClass("transform");
                        temp_values.length = 0;
                    }, 1000)
                }
            }
        }
        // add scoring
        $("#score").html("<p>Pairs Found: " + tiles_flipped / 2 + "</p>");

    }); // end of on click

}); // end of JQuery function