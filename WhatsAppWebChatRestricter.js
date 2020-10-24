var isPageReady = false;

final_chats = [
    '5A matematik grubu',
    '5/A ARAPÇA GRUBU',
    '5/A sınıfı',
    '5/A İNGİLİZCE',
    '5/A Fen Bilgisi',
]

init();

function init() {
    console.log('System initializing...');
    isPageReady = false;
    chatDetection();
}

function chatDetection() {
    console.log('Chat detection is creating...');

    var observer = new MutationObserver(function(mutations) {
        var check = document.getElementById('pane-side');
        if (check) {
            console.log('Chat section is detected!');
            hideUnwantedChats();
            observer.disconnect();
        }
    });

    observer.observe(document, observeConfigs());
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

    if (!isPageReady) {
        for (const group of groups) {
            if (!group.hidden) {
                var clickable_element = group.getElementsByClassName("eJ0yJ")[0];
                realLikeClick(clickable_element);
                break;
            }
        }
        removeRiskyModules();
        chatChangesDetection();
        inUseDetection();
    }
}

function inUseDetection() {
    console.log('WhatsApp Web already in use detection is creating...');

    var observer = new MutationObserver(function(mutations) {
        var multipleUsageInterrupt = document.getElementsByClassName('G_MLO')[0]
        if (document.contains(multipleUsageInterrupt)) {
            console.log('In Use section is detected!');
            document.getElementsByClassName('S7_rT FV2Qy')[0].addEventListener("click", init);
            document.getElementsByClassName('S7_rT _1hQZ_')[0].addEventListener("click", init);
            observer.disconnect();
        }
    });

    observer.observe(document, observeConfigs());
}

function chatChangesDetection() {
    console.log('Chat change detection is creating...');

    let observer = new MutationObserver(mutations => {
        console.log('Some chat changes...')
        hideUnwantedChats();
        // for (let mutation of mutations) {
        //     for (let node of mutation.addedNodes) {
        //         // we track only elements, skip other nodes (e.g. text nodes)
        //         if (!(node instanceof HTMLElement)) continue;

        //         // check the inserted element for being a code snippet
        //         if (node.matches('div[class*="_210SC"]')) {
        //             console.log('New chat detected!');
        //             hideUnwantedChats();
        //             return;
        //         }
        //     }
        //     for (let node of mutation.removedNodes) {
        //         // we track only elements, skip other nodes (e.g. text nodes)
        //         if (!(node instanceof HTMLElement)) continue;

        //         // check the inserted element for being a code snippet
        //         if (node.matches('div[class*="_210SC"]')) {
        //             console.log('Chat deletion detected!');
        //             hideUnwantedChats();
        //             return;
        //         }
        //     }
        // }
    });

    let demoElem = document.getElementById('pane-side');

    observer.observe(demoElem, observeConfigs());
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
    return { attributes: false, childList: true, characterData: false, subtree: true };
};