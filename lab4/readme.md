Lab 5

To start, I started to look over the previous work I had done with mongoDB in class when we set up Atlas. That sent me down a whole weird issue with git and getting the files setup on my current computer (because I use a different computer when I'm at my dorm compared to my school one). I don't know why it took so long to fix. After that, I started to set up the files on the database. I made a new databse and a new collection, and I realized that I probably want to auto increment. I ended up getting really stuck on setting a unique id for each element aswell as bulk uploading them. Eventually I just asked my friend for help and he was able to help me with a JS script to make an ID aswell as telling me how to bulk upload. In the process of this I had to deal with another angular issue that made be want to pull my hair out. For whatever reason it was giving me weird errors and the only solution I found was to literally undo all of the work that I did up to this point and just restart, which also required sticking with this folder being named lab4, I hope that's okay. So that was great. Anyway, after that fortunately I was able to upload the docs to MongoDB without much issue.


Next, I finally started to work on the actual main part. I set up the code that we worked on in class to work with my new database and collection. The first issue I had with this is getting the findOne query to work with the parameter number. It was the weirdest thing, everything else worked except for the variable that stored the number from the paramater. Eventually I tried casting the variable to a number and then it worked (I originally tried casting it to a String, but that didn't work. Likely because whatever object it was before had a complicated string). GET was pretty straightforward after that, only simple issues that I could figure out with a little bit of research. The POST was largely the same, however I had a little bit of trouble before I changed the POST I was doing in postman from text to JSON. For potentailly some extra creativity, I manually added the `key`, which is what I used to count up on all the documents, to all the added files so they should be able to be grabbed with the other calls. I got into the groove of things for PUT. I had to look into how the mongoDB API updates, but it was exactly how I expected to it update and wasn't that bad to implement. For DELETE it was pretty simple too. 


For the final step, I had to make the component. The actualy components might not look like much but it took at least a decent bit of time to set up. After that, it was mostly a lot of trial and error to get the actual HTTP requests to work and to get the data displayed correctly. I also some error checking for creativity potentially.


References:
* https://stackoverflow.com/questions/24898044/is-possible-to-save-javascript-variable-as-file
* https://expressjs.com/en/guide/routing.html#route-parameters
* https://www.postman.com/
* https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
* https://stackoverflow.com/questions/433627/concatenate-two-json-objects
* https://stackoverflow.com/questions/10563644/how-to-specify-http-error-code-using-express-js
* https://www.mongodb.com/docs/drivers/node/current/usage-examples/
* https://masteringjs.io/tutorials/express/body
* https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
* https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
* https://stackoverflow.com/questions/10563644/how-to-specify-http-error-code-using-express-js
* https://www.techiediaries.com/angular-9-ajax-get-and-post-requests-example/