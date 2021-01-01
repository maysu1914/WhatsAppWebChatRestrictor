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
        'Ödev Gurubu',
        '❤Ödev grubu❤',
        '5A DIN ve SIYER GRUBU',
        '5/A Beden Eğitimi',
        '5/A Türkçe grubu'
    ]
    chat_class = "_1MZWu";
    chat_name_class = "_1hI5g";
    chat_pane_id = 'pane-side';
    multiple_pop_class = '_30EVj IqPek';
    real_click_class = "_3Tw1q";
    chat_mini_image_class = "_1l12d";
    chat_height_dominant_class = "_3Pwfx";
    addCSS();

    chatObserver();
}

function addCSS() {
    var style = document.createElement('style');
    style.innerHTML = `
    /* Clickable phone numbers and usernames, admin's text for readonly groups, clickable notification message numbers */
    div.CWVX1.dV60t, span[role="button"][class="_2lheY"], span._1XH7x._3cwQ7._1VzZY {
        pointer-events: none; 
        cursor: default;
    }

    /* Forward button, Chat dropdown button, Group info -> Search My Contacts, sended messages dropdown button*/
    div._1ubAk, div._1lcup.kA6WR, div[class="_9lZ0E"][role="button"], div.N7Dyd.kA6WR{
        visibility: hidden;
    }

    /* pane-side overflow-y:auto-> limit the chats by window resolution, must be visible*/ 
    #pane-side{
        overflow-y: visible;
    }
    `;
    document.head.appendChild(style);
}

function chatObserver() {
    console.log('Chat observer is creating...');

    var observer = new MutationObserver(function(mutations) {
        var check = document.getElementById(chat_pane_id);
        if (check) {
            console.log('Chat section is detected!');

            observer.disconnect();

            console.log('Chat observer disconnected!')

            start();
        }
    });
    let app = document.getElementById('app');
    observer.observe(app, observeConfigs());
}

function start() {
    hideUnwantedChats();
    if (!isPageReady) oneTimeCleanup();
    changeObserver();
}

function hideUnwantedChats() {
    console.log('Unwanted chats are hiding...');

    chats = document.getElementsByClassName(chat_class);
    let heights = calculateHeights();
    let y_value = -heights.chat;
    for (let chat of chats) {
        let chat_name = chat.getElementsByClassName(chat_name_class)[0].textContent;
        chat_name = trimSpaces(chat_name);
        // console.log(chat_name)
        if (final_chats.includes(chat_name)) {
            y_value += heights.chat;
            transform_value = "translateY(" + y_value.toString() + "px)";
            chat_mini_image = chat.getElementsByClassName(chat_mini_image_class)[0];
            chat_mini_image.style.height = heights.image.toString() + "px";
            chat_mini_image.style.width = heights.image.toString() + "px";
            chat.style.transform = transform_value;
            chat.style.height = heights.chat.toString() + "px";
            chat.getElementsByClassName(chat_height_dominant_class)[0].style.height = heights.chat.toString() + "px";
            chat.hidden = false;
            // console.log(chat_name, 'görünür')
        } else {
            chat.hidden = true;
            // console.log(chat_name, 'gizli')
        }
    };
}

function oneTimeCleanup() {
    removeRiskyModules();

    for (let chat of chats) {
        if (!chat.hidden) {
            var clickable_element = chat.getElementsByClassName(real_click_class)[0];
            realLikeClick(clickable_element);
            break;
        }
    }
}

function changeObserver() {
    console.log('Change observer is creating...');

    let observer = new MutationObserver(mutations => {
        console.log('Some changes...');

        var multipleUsageInterrupt = document.getElementsByClassName(multiple_pop_class)[0]
        if (document.contains(multipleUsageInterrupt)) {
            console.log('In Use section is detected!');

            document.getElementsByClassName("_30EVj IqPek")[0].addEventListener("click", init);
            document.getElementsByClassName("_30EVj gMRg5")[0].addEventListener("click", init);
            observer.disconnect();

            console.log('Change observer disconnected!');

            return;
        }


        for (let mutation of mutations) {

            if (mutation.target.matches(`div[class*="${chat_class}"]`) && mutation.type === 'attributes') {
                console.log('Changes in the attributes of some chats...');

                observer.disconnect();

                console.log('Change observer disconnected!')

                start();
                return;
            }

            for (let node of mutation.addedNodes) {
                // we track only elements, skip other nodes (e.g. text nodes)
                if (!(node instanceof HTMLElement)) continue;

                if (node.matches(`div[class*="${chat_class}"]`)) {
                    console.log('New chats have arrived...');

                    observer.disconnect();

                    console.log('Change observer disconnected!')

                    start();
                    return;
                }
            }
        }
    });
    let chat_pane = document.getElementById(chat_pane_id);
    observer.observe(chat_pane, observeConfigs());
}

function removeRiskyModules() {
    console.log('Risky modules are deleting...');

    pane_side = document.getElementById('pane-side');
    pane_side.classList.remove('_3R02z');
    /* header, char search bar, */
    will_remove = ['header._2O84H', 'div._1Ra05', 'span._1DzHI']

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

function trimSpaces(text) {
    return text.split(/(\s+)/).filter(function(e) { return e.trim().length > 0; }).join(' ');
}

function calculateHeights() {
    let default_chat_height = 72;
    let default_img_height = 49;
    let viewer_height = document.documentElement.clientHeight
    if (final_chats.length * default_chat_height > viewer_height) {
        let new_chat_height = viewer_height / final_chats.length;
        let ratio = new_chat_height / default_chat_height;
        let new_img_height = ratio * default_img_height;

        return { image: new_img_height, chat: new_chat_height }
    } else {
        return { image: default_img_height, chat: default_chat_height }
    }
}

function observeConfigs() {
    return { attributes: true, childList: true, characterData: false, subtree: true };
};