# WhatsAppWebChatRestrictor
A JavaScript code for WhatsApp Web page that restrict the visibility of chats and disable risky parts to the purpose.

***Object:** Make WhatsApp Web to show only selected chats to user and don't allow anything other than sending messages (images, files etc.) to selected groups and chat based operations (exit, change description etc.)*

> ***Note:** Changing the name of any chat will cause to disappearing that chat due to the restrict system based on chat names.*

***My scenario:** The school of my sister using WhatsApp to inform parents about any homework or lesson hours changes. Every class has own WhatsApp chat. Therefore we must check these chats every day. But I can't focus them enough when I am busy. So as a solution I open my WhatsApp Web in our home computer and add the project to browser with a code injector and leave it there. Thus my sister and I can check the chats simultaneously. So this isn't a secure way to share your WhatsApp account with possible malicious person. The purpose is make your whatsapp account usable by a harmless person without being distracted from other chats and features.*

I made images to better explain what this project is for.

**Standard page of WhatsApp Web**
![image1](https://res.cloudinary.com/djiay4zdw/image/upload/v1603573493/1edited_mje6vo.jpg)

**Script injected page of WhatsApp Web (Chat selection is done through code)**
![image2](https://res.cloudinary.com/djiay4zdw/image/upload/v1603573494/2edited_nknaxh.jpg)

You can inject the code with any code injector extension to your internet browser. *(Tested with: Code Injector extension by L.Sabatelli)*

# Quick Start
- Create a new instance of WhatsAppWebChatRestrictor at the end of the code by sending group/chat names as array
- As example bellow:
  ```
  new WhatsAppWebChatRestrictor(['Group 1', "Group 2", 'Chat 1']);
  ```
