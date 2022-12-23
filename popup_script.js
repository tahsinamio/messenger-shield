chrome.runtime.sendMessage({ 
    message: "get_name"
}, response => {
    if (response.message === 'success') {
        // if response payload is empty 
        if (response.payload === '') {
            document.querySelector(
              "span"
            ).innerHTML = `Enter name`;
        } else {
             document.querySelector(
               "span"
             ).innerHTML = `Blocking "${response.payload}"`;
        }
    }
});

// append a submit button to the page
var button = document.createElement('button');
button.innerHTML = 'Confirm';
button.addEventListener('click', () => {
    // get input value
    var input = document.querySelector("input").value;
    // set name to input value
    chrome.runtime.sendMessage(
      {
        message: "change_name",
        payload: input
      },
      (response) => {
        if (response.message === "success") {
          
        }
      }
    );
    // clear input
    document.querySelector("input").value = '';
    // close popup
    window.close();
    // reload page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
});
document.body.appendChild(button);
