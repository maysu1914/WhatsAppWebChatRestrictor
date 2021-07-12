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
    chat_class = "_3m_Xw"; //    /html/body/div/div[1]/div[1]/div[3]/div/div/div[1]/div/div/div[1]
    chat_name_class = "_ccCW FqYAR i0jNr"; //    /html/body/div/div[1]/div[1]/div[3]/div/div/div[1]/div/div/div[1]/div/div/div[2]/div[1]/div[1]/span/span
    chat_pane_id = 'pane-side';
    real_click_class = "_2nY6U"; //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[2]/div/div
    chat_mini_image_class = "_3GlyB"; //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[1]/div/div/div[1]/div/div
    chat_height_dominant_class = "_2nY6U"; //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[1]/div/div
    multiple_pop_class = '_3J6wB'; //    /html/body/div/div[1]/div/div/div/div
    multiple_pop_button_1_class = "_20C5O _1zOyO" //    /html/body/div/div[1]/div/div/div/div/div/div[2]/div[1]
    multiple_pop_button_2_class = "_20C5O _2Zdgs" //    /html/body/div[1]/div/div/div/div/div/div/div[2]/div[2]
    // scroll bar class for paneside, should be removed
    pane_side_remove_class = '_20c87' //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]
    /* header, chat search bar, */
    will_be_removed = ['header', 'div.uwk68'] //    /html/body/div/div[1]/div[1]/div[3]/div/header, /html/body/div/div[1]/div[1]/div[3]/div/div[1]
    addCSS();

    chatObserver();
}

function addCSS() {
    var style = document.createElement('style');
    style.innerHTML = `
    /* Clickable phone numbers and usernames, admin's text for readonly groups, clickable notification message numbers */
    div._26iqs.UxSU9, span[role="button"][class="_17SvR"], span._1adfa.eHxwV._3-8er {
        pointer-events: none; 
        cursor: default;
    }

    /* Forward button, Chat dropdown button, Group info -> Search My Contacts, sended images dropdown button, sended messages dropdown button*/
    div._3nHC-, div._3dGJA._3qSKL, div[class="-ZdaK"][role="button"], div._39Lm1._36H8K._3_UDv, div._39Lm1._3qSKL{
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

    var observer = new MutationObserver(function (mutations) {
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
    // console.log(chats)
    let heights = calculateHeights();
    // console.log(heights)
    let y_value = -heights.chat;
    for (let chat of chats) {
        // console.log(chat)
        let chat_name_element = chat.getElementsByClassName(chat_name_class)[0];
        // console.log(chat_name_element)
        let chat_name = ''
        if (chat_name_element) {
            chat_name = trimSpaces(chat_name_element.innerText);
        } else {
            continue
        }
        // console.log(chat_name)
        if (final_chats.includes(chat_name)) {
            y_value += heights.chat;
            chat_mini_image = chat.getElementsByClassName(chat_mini_image_class)[0];
            // // console.log(chat_mini_image)
            chat_mini_image.style.height = heights.image.toString() + "px";
            chat_mini_image.style.width = heights.image.toString() + "px";
            chat.style.height = heights.chat.toString() + "px";
            chat.getElementsByClassName(chat_height_dominant_class)[0].style.height = heights.chat.toString() + "px";
            chat.hidden = false;
            // console.log(chat_name, 'görünür')
        } else {
            chat.hidden = true;
            // console.log(chat_name, 'gizli')
        }
    };
    // console.log(y_value)
    for (let chat of chats) {
        if (!chat.hidden) {
            // console.log(y_value)
            transform_value = "translateY(" + y_value.toString() + "px)";
            chat.style.transform = transform_value;
            y_value -= heights.chat;
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
        // console.log(multipleUsageInterrupt)
        if (multipleUsageInterrupt) {
            console.log('In Use section is detected!');

            document.getElementsByClassName(multiple_pop_button_1_class)[0].addEventListener("click", init);
            document.getElementsByClassName(multiple_pop_button_2_class)[0].addEventListener("click", init);
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
    // let chat_pane = document.getElementById(chat_pane_id);
    observer.observe(document, observeConfigs());
}

function removeRiskyModules() {
    console.log('Risky modules are deleting...');

    pane_side = document.getElementById(chat_pane_id);
    pane_side.classList.remove(pane_side_remove_class);

    for (const selector of will_be_removed) {
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

    var simulateMouseEvent = function (element, eventName, coordX, coordY) {
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
    return text.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; }).join(' ');
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