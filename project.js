let extensionID = "agnaejlkbiiggajjmnpmeheigkflbnoo"; //Chrome

if (typeof browser !== 'undefined' && typeof chrome !== "undefined"){
  extensionID = "{57081fef-67b4-482f-bcb0-69296e63ec4f}"; //Firefox
}

let clientID = "1319571957867352165";

chrome.runtime.sendMessage(extensionID, {mode: 'passive'}, function(response) {
    console.log('Presence registred', response);
});

chrome.runtime.onMessage.addListener(function(info, sender, sendResponse) {
    console.log('Presence requested', info);
    sendResponse(generatePresence());
});

//Setting the date here so that it does not get reset when presence is re-requested
let time = Date.now();

let windowName = "";
let projectName = "";

// Get the tab's name once everything is loaded so it isn't the default (Scratch - Imagine, Program, Share)
window.onload = () => {

  // Add a little delay
  setTimeout(() => {
    windowName = document.title;

    // The project name without the " on Scratch" (11 characters)
    projectName = windowName.substring(0, windowName.length - 11);
    console.log(projectName);
  }, 10000);

  /* 
  The 10 second delay is because it seems that window.onload is fired just a bit before the tab name is changed
  to the actual project name. The duration of 10 seconds is not signficant, as the presence is requested every 15 seconds
  */

}

function generatePresence() {

  //Check if the windowName is not empty
  if (windowName === "") {
    return (
      {
        clientId: clientID,
        presence: {
          details: "Working on a Scratch project!",
          startTimestamp: time,
          largeImageText: "Scratch",
          instance: true
        }
      }
    );
  }
  else { // Else we will display the project we are working on
    return (
      {
        clientId: clientID,
        presence: {
          details: `Working on - ${projectName}`,
          startTimestamp: time,
          largeImageText: "Scratch",
          instance: true
        }
      }
    );
  }

}