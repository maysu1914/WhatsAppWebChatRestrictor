init();

function init() {
    console.log('System initializing...');
    self.isPageReady = false;
    self.final_chats = [
        '5A matematik grubu',
        '5/A ARAPÇA GRUBU',
        '5/A sınıfı',
        '5/A İNGİLİZCE',
        '5/A Fen Bilgisi',
        '5/A ÖDEV GRUBU',
        '5A DIN ve SIYER GRUBU',
    ]
    addCSS();

    chatObserver();
}

function addCSS() {
    var style = document.createElement('style');
    style.innerHTML = `
    /* Clickable phone numbers and usernames */
    div.zGvn8._23x7I {
        pointer-events: none; 
        cursor: default;
    }

    /* Forward button, Chat dropdown button, Group info -> Search My Contacts */
    div._29g--, div._2nBjH._1q11a, div[class="_1Gecv"][role="button"]{
        visibility: hidden;
    }
    `;
    document.head.appendChild(style);
}

function chatObserver() {
    console.log('Chat observer is creating...');

    var observer = new MutationObserver(function(mutations) {
        var check = document.getElementById('pane-side');
        if (check) {
            console.log('Chat section is detected!');

            observer.disconnect();

            console.log('Chat observer disconnected!')

            start();
        }
    });

    observer.observe(document, observeConfigs());
}

function start() {
    hideUnwantedChats();
    if (!isPageReady) oneTimeCleanup();
    changeObserver();
}

function hideUnwantedChats() {
    console.log('Unwanted chats are hiding...');

    chats = document.getElementsByClassName('_210SC');

    var y_value = -72;
    for (const chat of chats) {
        var chat_name = chat.getElementsByClassName('_3CneP')[0].textContent.trim();
        if (final_chats.includes(chat_name)) {
            y_value += 72;
            var transform_value = "translateY(" + y_value.toString() + "px)";
            chat.style.transform = transform_value;
        } else {
            chat.hidden = true;
        }
    };
}

function oneTimeCleanup() {
    removeRiskyModules();

    for (const chat of chats) {
        if (!chat.hidden) {
            var clickable_element = chat.getElementsByClassName("eJ0yJ")[0];
            realLikeClick(clickable_element);
            break;
        }
    }
}

function changeObserver() {
    console.log('Change observer is creating...');

    let observer = new MutationObserver(mutations => {
        console.log('Some changes...');

        var multipleUsageInterrupt = document.getElementsByClassName('G_MLO')[0]
        if (document.contains(multipleUsageInterrupt)) {
            console.log('In Use section is detected!');

            document.getElementsByClassName('S7_rT FV2Qy')[0].addEventListener("click", init);
            document.getElementsByClassName('S7_rT _1hQZ_')[0].addEventListener("click", init);
            observer.disconnect();

            console.log('Change observer disconnected!');

            return;
        }


        for (let mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.target.matches('div[class*="_210SC"]')) {
                console.log('Changes in the attributes of some chats....');

                observer.disconnect();

                console.log('Change observer disconnected!')

                start();
                return;
            }

            for (let node of mutation.addedNodes) {
                // we track only elements, skip other nodes (e.g. text nodes)
                if (!(node instanceof HTMLElement)) continue;

                if (node.matches('div[class*="_210SC"]')) {
                    console.log('New chats have arrived...');

                    observer.disconnect();

                    console.log('Change observer disconnected!')

                    start();
                    return;
                }
                // console.log(node);
            }
        }
    });

    observer.observe(document, observeConfigs());
}

function removeRiskyModules() {
    console.log('Risky modules are deleting...');

    pane_side = document.getElementById('pane-side');
    pane_side.classList.remove('_3R02z');
    will_remove = ['header._1QUKR', 'div._2EoyP', 'span._1DzHI']

    for (const selector of will_remove) {
        var element = document.querySelector(selector);
        if (element) {
            element.parentNode.removeChild(element);
        } else {
            break;
        }
    };

    isPageReady = true;
};

function realLikeClick(element) {
    console.log('Real like click is simulating...');

    var simulateMouseEvent = function(element, eventName, coordX, coordY) {
        element.dispatchEvent(new MouseEvent(eventName, {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: coordX,
            clientY: coordY,
            button: 0
        }));
    };

    var box = element.getBoundingClientRect(),
        coordX = box.left + (box.right - box.left) / 2,
        coordY = box.top + (box.bottom - box.top) / 2;

    simulateMouseEvent(element, "mousedown", coordX, coordY);
    simulateMouseEvent(element, "mouseup", coordX, coordY);
    simulateMouseEvent(element, "click", coordX, coordY);
};

function observeConfigs() {
    return { attributes: true, childList: true, characterData: false, subtree: true };
};