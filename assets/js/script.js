var currentDayDisplay = document.querySelector("#currentDay");
var timeBlockEl = $(".container");
var arrHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];


function initGenerateTimeblocks(){
    // get the events from local storage
    // generate the timeblocks
    /* this is what the timeblocks look like:
    <div class="row time-block">
          <label for="userTask9" class="hour col">9AM</label>
          <textarea id="userTask9" name="userTask9" class="col-8" data-hour="9"></textarea>
          <button type="button" data-hour="9" class="saveBtn">SAVE</button>
      </div> */
    arrHours.forEach(function(hour, index){
        var timeBlock = $("<div>");
        var blockLabel = $("<label>");
        var blockText = $("<textarea>");
        var blockBtn = $("<button>");
    
        timeBlock.addClass("row time-block");

        blockLabel.addClass("hour col");
        blockLabel.attr("for", function(){
            return "userTask" + hour.split(" ", 1);
        });
        blockLabel.text(hour);

        blockText.addClass("col-8");
        blockText.attr("id", function(){
            return "userTask" + hour.split(" ", 1);
        });
        blockText.attr("name", function(){
            return "userTask" + hour.split(" ", 1);
        });
        blockText.attr("data-hour", hour.split(" ", 1));
        
        blockBtn.addClass("saveBtn");
        blockBtn.text("Save");

        timeBlock.append(blockLabel);
        timeBlock.append(blockText);
        timeBlock.append(blockBtn);
        timeBlockEl.append(timeBlock);
        //console.log(timeBlock);
    });



}

function displayTime(){
    // get the current time, which is updated every interval, and show it
    var currentTime = moment();
    var currentHour = currentTime.hour();
    currentDayDisplay.textContent = currentTime.format("MMMM Do YYYY, h:mm:ss a");
    //var checkingTimeBlock = timeBlockEl.children(timeBlockEl.children.attr(hour));
    // change the class of the userTask to past, present, or future depending on the currentTime
    arrHours.forEach(function (hour, index) {
        // checkHour is the hour and timeBlock to be checked
        var changeHour = "[data-hour=" + hour.split(" ", 1) + "]";
        var checkHour = hour.split(" ", 1);
        //timeBlockEl.find("[data-hour=9]").addClass("past");
        
        if ( currentHour == checkHour){
            timeBlockEl.find(changeHour).addClass("present");
        } else if (checkHour < currentHour){
            timeBlockEl.find(changeHour).addClass("past");
        } else {
            timeBlockEl.find(changeHour).addClass("future");
            console.log(timeBlockEl.find("textarea").filter(changeHour));
        }
    })
};

function saveTask(event){
    console.log(event.target);
    var btnClicked = $(event.target);
    console.log(btnClicked);
    console.log(btnClicked.parent);
}

timeBlockEl.on("click", ".saveBtn", saveTask)

setInterval(displayTime, 1000);
//console.log(timeBlockEl);
//console.log(moment().hour());
//console.log(timeBlockEl.find("textarea").data("hour"));
//console.log(timeBlockEl.find("[data-hour=9]"));
//console.log(timeBlockEl.children("[data-hour=9]"));

initGenerateTimeblocks();
//timeBlockEl.find("[data-hour=9]").addClass("past");