$(document).ready(function () {
    console.log("Let's get started!");

    //inside the var topics put your selected theme
    var topics = [
        "Streching",
        "Swimming",
        "Snow-boarding",
        "Cartoon-Workout",
        "Dancing"
    ];
    // this is the limitation of how many pic you wanna show on the screen with each click/per topic
    // var picsPerTopic = 10;
    // var topicButtons = [];
    var picButtons = [];


    function giftastic() {

        setupPage();
    }

    function setupPage() {

        generateTopicSection();
        //addNewTopic();
    }
    //generate topic section with all the buttons
    function generateTopicSection() {
        // Deletes the buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#topic-section").empty();
        //looping through the array of topics

        for (i = 0; i < topics.length; i++) {
            //creating new button for each item in topics array
            var newButton = $("<button>")
            //Add a class to our button
            newButton.addClass("topic-btn")
            // Add a data-attribute
            newButton.attr("data-name", topics[i])
            // Provid the initial button text
            newButton.text(topics[i]);
            // Add the button to the topic-section div
            $("#topic-section").append(newButton);
        }

    }
    //add the text box/new topic to the screen
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topicButtons = $("#validationCustom01").val().trim();

        // The new topic from the textbox is then added to our array
        topics.push(topicButtons);

        // Calling renderButtons which handles the processing of our movie array
        generateTopicSection();
    });


    function getDispalyPics() {

        var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" + topics + "&api_key=cDzVAOKFADbFNgyeKftxDbwnHSSovoPU&limit=10&rating=G";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            console.log(queryURL);



        });

    };
    // Adding click event listeners to all elements with a class of "topic-btn"
    $(document).on("click", ".topic-btn", getDispalyPics);

    // Calling the generateTopicSecton function to display the intial buttons
    generateTopicSection();

    getDispalyPics();
});