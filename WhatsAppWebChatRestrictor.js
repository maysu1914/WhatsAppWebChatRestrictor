class WhatsAppWebChatRestrictor {
    constructor(visible_chat_names) {
        console.log('Initializing the system...');
        this.isPageReady = false;
        this.element_selectors = {
            app: "#app",
            //    /html/body/div/div[1]/div[1]/div[3]/div/div/div[1]/div/div/div[1]
            chat: "._3m_Xw",
            //    /html/body/div/div[1]/div[1]/div[3]/div/div/div[1]/div/div/div[1]/div/div/div[2]/div[1]/div[1]/span
            chat_name: ".ggj6brxn.gfz4du6o.r7fjleex.g0rxnol2.lhj4utae.le5p0ye3.l7jjieqr.i0jNr",
            chat_pane: '#pane-side',
            //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[2]/div/div
            real_click: "._2nY6U",
            //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[1]/div/div/div[1]/div/div
            chat_mini_image: "._3GlyB",
            //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/div[1]/div/div
            chat_height_dominant: "._2nY6U",
            //    /html/body/div/div[1]/div/div/div/div
            multiple_pop: '._3J6wB',
            //    /html/body/div/div[1]/div/div/div/div/div/div[2]/div[1]
            multiple_pop_button_1: "._20C5O._1zOyO",
            //    /html/body/div[1]/div/div/div/div/div/div/div[2]/div[2]
            multiple_pop_button_2: "._20C5O._2Zdgs",
            //    /html/body/div/div[1]/div[1]/div[3]/div/header    header
            //    /html/body/div/div[1]/div[1]/div[3]/div/div[1]    chat search bar
            //    /html/body/div[1]/div[1]/div[1]/div[3]/div/span   blue notification box top of chats
            will_be_removed: [
                '#side > header',
                'div.uwk68',
                "div#side > span._3z9_h"
            ],
        };
        this.pure_element_classes = {
            //    /html/body/div/div[1]/div[1]/div[3]/div/div[2]    scroll bar class for paneside, should be removed
            pane_side_remove: '_20c87'
        };
        this.css = `/* Clickable phone numbers and usernames, admin's text for readonly groups, clickable notification message numbers */
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
        }`;
        this.visible_chat_names = visible_chat_names;
        this.addCSS();
        this.createChatObserver();
    }
    addCSS() {
        console.log('Adding the CSS...');
        let style = document.createElement('style');
        style.innerHTML = this.css;
        document.head.appendChild(style);
    }
    createChatObserver() {
        console.log('Creating the chat observer...');
        let wwcr = this;
        let observer = new MutationObserver(function () {
            let chat_pane = document.querySelector(wwcr.element_selectors.chat_pane);
            if (chat_pane) {
                console.log('Chat section is detected!');
                this.disconnect();
                console.log('Chat observer is disconnected!')
                wwcr.run();
            }
        });
        let app = document.querySelector(this.element_selectors.app);
        observer.observe(app, this.getObserverConfig());
    }
    run() {
        this.hideUnwantedChats();
        if (!this.isPageReady) this.oneTimeCleanup();
        this.createChangeObserver();
    }
    hideUnwantedChats() {
        console.log('Hiding unwanted chats...');
        let chats = document.querySelectorAll(this.element_selectors.chat);
        let heights = this.getCalculatedHeights();
        let y_value = -heights.chat;
        for (let chat of chats) {
            let chat_name_element = chat.querySelector(this.element_selectors.chat_name);
            let chat_name = ''
            if (chat_name_element) {
                chat_name = trimSpaces(chat_name_element.innerText);
            } else {
                continue
            }
            if (this.visible_chat_names.includes(chat_name)) {
                y_value += heights.chat;
                let chat_mini_image = chat.querySelector(this.element_selectors.chat_mini_image);
                chat_mini_image.style.height = heights.image.toString() + "px";
                chat_mini_image.style.width = heights.image.toString() + "px";
                chat.style.height = heights.chat.toString() + "px";
                chat.querySelector(this.element_selectors.chat_height_dominant).style.height = heights.chat.toString() + "px";
                chat.hidden = false;
                // console.log(chat_name, 'görünür')
            } else {
                chat.hidden = true;
                // console.log(chat_name, 'gizli')
            }
        };
        for (let chat of chats) {
            if (!chat.hidden) {
                let transform_value = "translateY(" + y_value.toString() + "px)";
                chat.style.transform = transform_value;
                y_value -= heights.chat;
            }
        };
    }
    createChangeObserver() {
        console.log('Creating the change observer...');
        let wwcr = this;
        let observer = new MutationObserver(mutations => {
            console.log('Some changes...');
            let multipleUsageInterrupt = document.querySelector(wwcr.element_selectors.multiple_pop)
            if (multipleUsageInterrupt) {
                console.log('In Use section is detected!');
                let reconstruction = () => {
                    new WhatsAppWebChatRestrictor(wwcr.visible_chat_names)
                }
                document.querySelector(wwcr.element_selectors.multiple_pop_button_1).addEventListener("click", reconstruction);
                document.querySelector(wwcr.element_selectors.multiple_pop_button_2).addEventListener("click", reconstruction);
                observer.disconnect();
                console.log('Change observer disconnected!');
                return;
            }
            for (let mutation of mutations) {
                if (mutation.target.matches(`div[class*="${wwcr.element_selectors.chat}"]`) && mutation.type === 'attributes') {
                    console.log('Changes in the attributes of some chats...');
                    observer.disconnect();
                    console.log('Change observer disconnected!')
                    wwcr.run();
                    return;
                }
                for (let node of mutation.addedNodes) {
                    // we track only elements, skip other nodes (e.g. text nodes)
                    if (!(node instanceof HTMLElement)) continue;
                    if (node.matches(`div[class*="${wwcr.element_selectors.chat}"]`)) {
                        console.log('New chats have arrived...');
                        observer.disconnect();
                        console.log('Change observer disconnected!')
                        wwcr.run();
                        return;
                    }
                }
            }
        });
        // let chat_pane = document.getElementById(chat_pane_id);
        observer.observe(document, this.getObserverConfig());
    }
    oneTimeCleanup() {
        let chats = document.querySelectorAll(this.element_selectors.chat);
        this.removeRiskyModules();
        for (let chat of chats) {
            if (!chat.hidden) {
                let clickable_element = chat.querySelector(this.element_selectors.real_click);
                realLikeClick(clickable_element);
                break;
            }
        }
    }
    removeRiskyModules() {
        console.log('Deleting risky modules...');
        let pane_side = document.querySelector(this.element_selectors.chat_pane);
        pane_side.classList.remove(this.pure_element_classes.pane_side_remove);
        for (let element of document.querySelectorAll(this.element_selectors.will_be_removed)) {
            if (element) {
                element.parentNode.removeChild(element);
            } else {
                break;
            }
        };
        this.isPageReady = true;
    };
    getCalculatedHeights() {
        let default_chat_height = 72;
        let default_img_height = 49;
        let viewer_height = document.documentElement.clientHeight
        if (this.visible_chat_names.length * default_chat_height > viewer_height) {
            let new_chat_height = viewer_height / final_chats.length;
            let ratio = new_chat_height / default_chat_height;
            let new_img_height = ratio * default_img_height;

            return {
                image: new_img_height,
                chat: new_chat_height
            }
        } else {
            return {
                image: default_img_height,
                chat: default_chat_height
            }
        }
    }
    getObserverConfig() {
        return {
            attributes: true,
            childList: true,
            characterData: false,
            subtree: true
        };
    };
}

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

function getClosest(element, closest_selector) {
    while (element != document) {
        element = element.parentNode
        if (element.matches(closest_selector)) {
            return element;
        }
    }
    return null
}

function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function trimSpaces(text) {
    return text.split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
    }).join(' ');
}
