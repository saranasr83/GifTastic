$(document).ready(function () {

    console.log("Lettt's get started!");

    //inside the var topics put your selected theme
    var topics = [
        "Swimming",
        "Kickboxing",
        "Snow-boarding",
        "Funny-Workout",
        "Dancing"
    ];
    // this is the limitation of how many pic you wanna show on the screen with each click/per topic
    // var picsPerTopic = 10;
    // var topicButtons = [];
    // var picButtons = [];

    //this is the main function starting the page

    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");
        console.log(state);

        //Check if the variable state is equal to 'still',

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    // //this is the setup function:
    function setupPage() {

        generateTopicSection();
        // addNewTopic();
    }


    // //generate topic section with all the buttons
    function generateTopicSection() {
        // Deletes the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)

        $("#topic-section").empty();
        //looping through the array of topics

        for (var i = 0; i < topics.length; i++) {

            //creating new button for each item in topics array
            var newButton = $("<button>")

            //Add a class to our button
            newButton.addClass("topic-btn")
            newButton.attr("id", "topic-btn" + i)
            // Add a data-attribute
            newButton.attr("data-name", topics[i])
            // Provid the initial button text
            newButton.text(topics[i]);
            // Add the button to the topic-section div
            // console.log("adding onclick for button i:", i, " attribute:", newButton.attr("data-name"))

            // console.log("test", newButton.attr("id"))
            // console.log("test", $(newButton.attr("id")).attr("data-name"))
            //now add this new button to the list of topicButtons:
            // topicButtons.push(newButton);
            $("#topic-section").append(newButton);
        }
    }

    $(document).on("click", ".topic-btn", function (event) {
        event.preventDefault();
        var topics = $(this).attr("data-name");
        // console.log(topic)
        // This line of code will grab the input from the textbox
        getDispalyPics(topics)
    });

    //add the text box/new topic to the screen
    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var newTopicText = $("#validationCustom01").val().trim();
        // console.log(newTopicText );
        // The new topic from the textbox is then added to our array
        topics.push(newTopicText);

        generateTopicSection();
    });




    function getDispalyPics(topics) {
        // console.log("getDisplayPics running with topic:", topic)
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cDzVAOKFADbFNgyeKftxDbwnHSSovoPU&q=" + topics + "&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            // console.log(queryURL);
            var results = response.data;
            for (i = 0; i < results.length; i++) {
                var stillGif = results[i].images.original_still.url
                // console.log("the still gif: ", stillGif);
                var animated = results[i].images.original.url
                // console.log("test the animated:", results[i].images.original.url)
                var rating = results[i].rating
                // console.log("test the rating:", results[i].rating)
                // Make a div with jQuery and store it in a variable named picSection.
                var picSectionDiv = $("<div>");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // set the inner text of the paragraph to the rating of the image
                p.text("Rating: " + rating);
                //make an image tag and store it in a variable call searchImage.
                var searchImage = $("<img>");
                //set the image's src to result[i]'s stillGif
                searchImage.attr("src", stillGif)
                searchImage.attr("data-animate", animated)
                searchImage.attr("data-still", stillGif)
                searchImage.attr("data-state", "still")
                searchImage.attr("class", "gif")
                //append the p variable to the picSection div
                picSectionDiv.append(p);
                //append the searchImage variable to the picSection div
                picSectionDiv.append(searchImage);
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                $("#gifs-appear-here").prepend(picSectionDiv);
            }


        });

    };

    //let's call the main function to start the page:
    setupPage();
});


// newButton.on("click", function (event) {
//     event.preventDefault();
//     console.log(" onclick data-name:", newButton.attr("data-name"))
//     console.log(" onclick text:", newButton.text())
//     getDispalyPics(newButton.attr("data-name"));
// });