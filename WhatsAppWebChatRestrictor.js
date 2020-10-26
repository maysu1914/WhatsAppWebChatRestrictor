init();

function init() {
    console.log('System initializing...');
    disconnectMutationObservers();
    self.all_observers = {};
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

    chatDetection();
}

function chatDetection() {
    console.log('Chat detection is creating...');

    var observer = new MutationObserver(function(mutations) {
        var check = document.getElementById('pane-side');
        if (check) {
            console.log('Chat section is detected!');

            delete all_observers['chatDetection'];
            observer.disconnect();
            start();
        }
    });

    observer.observe(document, observeConfigs());
    all_observers['chatDetection'] = observer;
}

function start() {
    hideUnwantedChats();

    if (!isPageReady) oneTimeCleanup();

    chatChangesDetection();
}

function hideUnwantedChats() {
    console.log('Unwanted chats are hiding...');

    groups = document.getElementsByClassName('_210SC');

    var y_value = -72;
    for (const group of groups) {
        var group_name = group.getElementsByClassName('_3CneP')[0].textContent.trim();
        if (final_chats.includes(group_name)) {
            y_value += 72;
            var transform_value = "translateY(" + y_value.toString() + "px)";
            group.style.transform = transform_value;
        } else {
            group.hidden = true;
        }
    };
}

function oneTimeCleanup() {
    for (const group of groups) {
        if (!group.hidden) {
            var clickable_element = group.getElementsByClassName("eJ0yJ")[0];
            realLikeClick(clickable_element);
            break;
        }
    }
    removeRiskyModules();
    inUseDetection();
}

function inUseDetection() {
    console.log('WhatsApp Web already in use detection is creating...');

    var observer = new MutationObserver(function(mutations) {
        var multipleUsageInterrupt = document.getElementsByClassName('G_MLO')[0]
        if (document.contains(multipleUsageInterrupt)) {
            console.log('In Use section is detected!');
            document.getElementsByClassName('S7_rT FV2Qy')[0].addEventListener("click", init);
            document.getElementsByClassName('S7_rT _1hQZ_')[0].addEventListener("click", init);
            delete all_observers['inUseDetection'];
            observer.disconnect();
        }
    });

    observer.observe(document, observeConfigs());
    all_observers['inUseDetection'] = observer;
}

function chatChangesDetection() {
    console.log('Chat change detection is creating...');

    let observer = new MutationObserver(mutations => {
        console.log('Some changes...')

        for (let mutation of mutations) {
            if (mutation.type === 'attributes' && mutation.target.matches('div[class*="_210SC"]')) {
                console.log('Changes in the attributes of some chats....');
                observer.disconnect();
                start();
                return;
            }

            for (let node of mutation.addedNodes) {
                // we track only elements, skip other nodes (e.g. text nodes)
                if (!(node instanceof HTMLElement)) continue;

                if (node.matches('div[class*="_210SC"]')) {
                    console.log('New chats have arrived...');

                    delete all_observers['chatChangesDetection'];
                    observer.disconnect();
                    start();
                    return;
                }
            }
        }
    });

    let demoElem = document.getElementById('pane-side');

    observer.observe(demoElem, observeConfigs());
    all_observers['chatChangesDetection'] = observer;
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

function disconnectMutationObservers() {
    console.log("Existing observers are disconnecting...");

    if (!(typeof all_observers === 'undefined')) {
        for (var key in all_observers) {
            all_observers[key].disconnect();
            console.log(key, "disconnected!");
        }
    }
}