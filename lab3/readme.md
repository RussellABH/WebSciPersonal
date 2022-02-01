I started with setting up the .gitignore and all the express dependencies. After that I started with the code we worked on in class, deleting the attempt at using FS that I did. Then, I set up a basic boostrap input and started to work on the server. The first issue I had was to actually send them the index.html, but I found an easy way to do that using path and res.sendFile(). I ran into an issue - `The resource from “http://localhost:3000/main.js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff).` At some point I thought I fixed it but I actually just killed the html tag so it didn't show the error at all. Eventually, this was fixed by serving the files with `app.use(express.static(__dirname));` (all my files are public so I didn't add a public folder). Honestly I don't understand the different between static and dynamic files but this works for now. Now, I finally added some simple JS to allow the button to be pressed. However, while doing this, I was annoyed with the favicon 404 error that I've ignored for years. So, for creativity, I decided to custom make an icon based on the steam icon but with a P instead of the steam icon. I think it looks not that bad and adds a little bit of professionalism.

Make the color scheme of the site based on steam's blue/black 

References 
* https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
* https://getbootstrap.com/docs/5.1
* https://tutorial.eyehunts.com/js/call-javascript-function-on-enter-keypress-in-the-textbox-example-code/
* http://expressjs.com/en/starter/static-files.html
* https://api.jquery.com/val/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
* https://stackoverflow.com/questions/44657829/css-file-blocked-mime-type-mismatch-x-content-type-options-nosniff
* https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
* https://stackoverflow.com/questions/31075893/im-getting-favicon-ico-error
* https://en.wikipedia.org/wiki/File:Steam_icon_logo.svg
* 