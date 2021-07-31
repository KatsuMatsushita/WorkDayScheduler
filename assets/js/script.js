var currentDayDisplay = document.querySelector("#currentDay");
var timeBlockEl = $(".container");
var arrHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
var savedItems = [];

// Need to create a new object called savedItem so that multiple can be created and called later
function savedItem (savedTime, savedText) {
    this.savedTime = savedTime;
    this.savedText = savedText;
};

function initGenerateTimeblocks(){
    // get the events from local storage
    // generate the timeblocks
    /* this is what the timeblocks look like:
        <div class="row time-block">
          <label for="userTask9" class="hour col">9AM</label>
          <textarea id="userTask9" name="userTask9" class="col-8" data-hour="9"></textarea>
          <button type="button" data-hour="9" class="saveBtn">SAVE</button>
        </div> */

    // bring in the JSON object, if null then initiatlize the array of objects, for each timeblock in arrHours, put a savedItem object
    // inside of savedItems

    var fromStorage = JSON.parse(localStorage.getItem("storedPlans"));
    if (fromStorage !== null){
        // replace the appropriate objects in the savedItems with the objects from fromStorage
        // the fromStorage and the savedItems should both be the same length
        savedItems = fromStorage;
    } else {
        arrHours.forEach(function(h, i){
            var newSavedItem = new savedItem("", "");
            var amPM = h.split(" ");

            if (amPM[1] == "PM" && amPM[0] != "12"){
                amPM[0] = parseInt(amPM[0]) + 12;
                amPM[0] = amPM[0].toString();
            };
            savedItems.push(newSavedItem);
            savedItems[i].savedTime = amPM[0];
        });
    };
 

    arrHours.forEach(function(hour, index){
        var timeBlock = $("<div>");
        var blockLabel = $("<label>");
        var blockText = $("<textarea>");
        var blockBtn = $("<button>");
        var amPM = hour.split(" ");

        if (amPM[1] == "PM" && amPM[0] != "12"){
            amPM[0] = parseInt(amPM[0]) + 12;
        };
        
        var userTaskAMPM = "userTask" + amPM[0];
        
        timeBlock.addClass("row time-block");

        blockLabel.addClass("hour col");
        blockLabel.attr("for", userTaskAMPM);
        blockLabel.text(hour);

        blockText.addClass("col-8");
        blockText.attr("id", userTaskAMPM);
        blockText.attr("name", userTaskAMPM);
        blockText.attr("data-hour", amPM[0]);
        blockText.val(savedItems[index].savedText);
        
        blockBtn.addClass("saveBtn");
        blockBtn.text("Save");

        timeBlock.append(blockLabel);
        timeBlock.append(blockText);
        timeBlock.append(blockBtn);
        timeBlockEl.append(timeBlock);

    });



};

function displayTime(){
    // get the current time, which is updated every interval, and show it
    var currentTime = moment();
    var currentHour = currentTime.hour();
    currentDayDisplay.textContent = currentTime.format("MMMM Do YYYY, h:mm:ss a");
    //var checkingTimeBlock = timeBlockEl.children(timeBlockEl.children.attr(hour));
    // change the class of the userTask to past, present, or future depending on the currentTime
    arrHours.forEach(function (hour, index) {
        // amPm is the hour and timeBlock to be checked
        var amPM = hour.split(" ");

        if (amPM[1] == "PM" && amPM[0] != "12"){
            amPM[0] = parseInt(amPM[0]) + 12;
        };

        var changeHour = "[data-hour=" + amPM[0] + "]";
        
        //convert the checkHour to 24H time to fit with the data-hour attribute
        
        if ( currentHour == amPM[0]){
            timeBlockEl.find(changeHour).removeClass("past future").addClass("present");
        } else if (amPM[0] < currentHour){
            timeBlockEl.find(changeHour).removeClass("present future").addClass("past");
        } else {
            timeBlockEl.find(changeHour).removeClass("present past").addClass("future");
        }
    })
};

function saveTask(event){
    var btnClicked = $(event.target);
    var textToStore = btnClicked.prev().val();

    // check that there is text then get the data-hour of the textarea
    if(textToStore !== null){
        var btnHour = btnClicked.prev().attr("data-hour");

        // foreach element(object) of savedItems check to see if it matches the data-hour
        // then put textToStore into the savedText and exit
        savedItems.forEach(function(hour, index, items){
            if (btnHour == items[index].savedTime){
                items[index].savedText = textToStore;
                return;
            }
        })
    }
    // saved the entire savedItems to the local storage
    localStorage.setItem("storedPlans", JSON.stringify(savedItems));
};

timeBlockEl.on("click", ".saveBtn", saveTask)

setInterval(displayTime, 1000);

initGenerateTimeblocks();