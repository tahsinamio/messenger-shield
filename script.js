const process = () => {
  chrome.runtime.sendMessage(
    {
      message: "get_name",
    },
    (response) => {
      if (response.message === "success") {
        const loaded = waitForElm('[data-scope="messages_table"]');

        loaded.then((res) => {
          const targetItems = document.querySelectorAll(
            '[data-scope="messages_table"]'
          );
          targetItems.forEach((item) => {
            replaceText(item, response.payload);
          });
        });
      }
    }
  );
}



// on page load
process();
setTimeout(process, 10);
setTimeout(process, 50);
setTimeout(process, 100);
setTimeout(process, 200);
setTimeout(process, 300);
setTimeout(process, 500);
setTimeout(process, 1000);
setTimeout(process, 2000);
setTimeout(process, 3000);

// on url change
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

function onUrlChange() {
  //console.log("URL changed!", location.href);
  process();
  setTimeout(process, 10);
  setTimeout(process, 50);
  setTimeout(process, 100);
  setTimeout(process, 200);
  setTimeout(process, 300);
  setTimeout(process, 500);
  setTimeout(process, 1000);
  setTimeout(process, 2000);
  setTimeout(process, 3000);
}

function replaceText(item, nickname) {
  if (nickname === "") return;
  var regex = new RegExp(nickname, "gi");
  //console.log(regex, nickname);
  item.childNodes.forEach((child) => {
    if (child.textContent.match(regex)) {
      child.parentElement.style.display = "none";
    }
  });
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}