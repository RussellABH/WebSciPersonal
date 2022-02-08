For this lab I decided to use to Steam API

I started with setting up the .gitignore and all the express dependencies. After that I started with the code we worked on in class, deleting the attempt at using FS that I did. Then, I set up a basic boostrap input and started to work on the server. The first issue I had was to actually send them the index.html, but I found an easy way to do that using path and res.sendFile(). I ran into an issue - `The resource from “http://localhost:3000/main.js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff).` At some point I thought I fixed it but I actually just killed the html tag so it didn't show the error at all. Eventually, this was fixed by serving the files with `app.use(express.static(__dirname));` (all my files are public so I didn't add a public folder). Honestly I don't understand the difference between static and dynamic files but this works for now. Now, I finally added some simple JS to allow the button to be pressed. 

Next I started on the API. I made an ajax call from my frontend to my backend. My backend then utilizes axios to make an api call to the Steam API to see if that username exists. If it does, I make another API call and grab a bunch of profile data and respond with all that data plus an `exists` key that equals 1. If it doesn't exist, I just send back an object where `exists` == 0. This was actually annoying to do, since for the longest time I couldn't figure out how to add two Objects together. I couldn't iterate over, JSON.parse(), or just add the two objects together. Eventually I found the spread operator through a friend and was able to use that. After that I added an alert so if the frontend can't connect to the backend for some reason the user knows that. I also decided to grab even more data from the steam API at this point so I nested yet another axios get to grab the games that the user has played.

For the frontend I tried to use Steam's color scheme. Other than that it wasn't super complicated but still took me a while because frontend always takes me a while. However, while doing this, I was annoyed with the favicon 404 error that I've ignored for years. So, for creativity, I decided to custom make an icon based on the steam icon but with a P instead of the steam icon. I think it looks not that bad and adds a little bit of professionalism.

Unfortunately the Steam API requires that you set a vanity URL for easy lookup (otherwise you have to know your ID, which is even more unlikely than having a vanity URL setup). However, two names that I know you can test are O2Cubed (myself) and Arkansas640.

Documentation:

The API has one endpoint, which is `/profile/[username]`, where `username` is the vanity url name of a public profile that you want to look up. The API returns a JSON object. If the username was not found, the object only has one item, `exists`, which will be 0. However, if it was found, it returns the following data:
* exists: 1
* steamid
* communityvisibilitystate
* profilestate
* personaname
* profileurl
* avatar
* avatarmedium
* avatarfull
* avatarhash
* lastlogoff
* personastate
* primaryclanid
* timecreated
* personastateflags
* loccountrycode
* game_count
* games[]

Information on each data point can be found at https://developer.valvesoftware.com/wiki/Steam_Web_API.

Technically you can POST to `/profile` to "create a profile" and PUT/DELETE to to `/profile/[username]` but these don't do anything currently.


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
* https://steamcommunity.com/dev
* https://developer.valvesoftware.com/wiki/Steam_Web_API
* https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
* 