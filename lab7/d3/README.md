To start, I had to find a bunch of relevant data because I did the hackathon and as such don't have any data. To start, I looked around Kaggle. However, all the data there for what I wanted (data on games) was old. So instead, **for creativity**, I decided to attempt to scrape the new data from the site that they used. I definitely didn't want to make my own scraper, so I look around on GitHub for scrapers that other people have made. After trying a few that didn't work, I'm currently running this one - https://github.com/baynebrannen/vgchartz-crawler. This is the first that didn't immediately error out (even after checking imports etc.) so I'm hopeful. If this doesn't work, then I will probably just use the outdated data available on Kaggle. After letting it run, the data was successfully scraped (All 62k+ lines). However, games are listed multiple times, one for each console. So I think what I'll do is write a simple python script to only grab the ones that are listed on console (fixData.py). I also edited the script to only include games with an actual critic score. This way, we should have some solid data to work with. All the files that I made while doing this are in the scrapeData folder. I did notice that for some reason all the entries in the json files are lists, probably due to the way that the scraper made them. I believe that this would probably pose a problem, so I made another script to change all the lists to be just the value itself (noLists.py). There were cases where the lists were more than one value, but I only saw this with titles where the second index was "Read for Review", so that's not helpful anyway. Finally, I realized that I want to use a metric for the number of games sold, but the problem was that some game had total_shipped while others had total_sales, so I had to figure out which to use. After adding metrics to noLists.py, I found out that a game will have one or the other but not both (it can also have neither). So, I removed all the games that had no data on how many sold and combined the other two into one key, "num_sold" (in noLists.py). Unfortunately after all these changes I only have 569 games, however this should give me some solid data to use as all these games are relevant for PC, have a critic score, have number sold, and aren't in a weird format. If you want to run the scripts, run the crawler first if you want (it takes at least 30 mins to run so I would suggest skipping it), then run fixData.py and manually remove the last comma from fixedData.json, run noLists.py, and then manually remove the last comma from fixedDataNoLists.json. That final file will be the data I'm going to be using. This took a while but hopefully it results in the other parts being easier and lends itself to good visualizations (plus creativity). 

Next, I uploaded the data to MongoDB using MongoDBCompass. Because this will eventually be a part of my steam profile site, I put it as a collection under that database. There were no problems here. During this I also noticed that there were two games that didn't have a release date so I just manually removed those. 

It was around this time that I was having a lot of trouble with git because the starter code that you gave was already tracked by git, so it wouldn't commit any changes I made to the angular project. This was solved by manually removing the .git folder and running a command I found at https://stackoverflow.com/questions/47403358/fatal-in-unpopulated-submodule.

Next, I had to get the MongoDB data into my components. First, I set up the API endpoint to send the data without too much issue.

References:
* https://www.kaggle.com/
* https://github.com/baynebrannen/vgchartz-crawler
* https://www.vgchartz.com/
* https://www.geeksforgeeks.org/reading-and-writing-json-to-a-file-in-python/?ref=lbp
* https://stackoverflow.com/questions/12201928/open-gives-filenotfounderror-ioerror-errno-2-no-such-file-or-directory
* https://www.geeksforgeeks.org/writing-to-file-in-python/#writing
* https://note.nkmk.me/en/python-type-isinstance/
* https://realpython.com/iterate-through-dictionary-python/#iterating-through-items
* https://stackoverflow.com/questions/47403358/fatal-in-unpopulated-submodule



The README that was already here:

Angular + D3
============
Follow me if you want to try reproducing this project from scratch.

Steps
-----
1. npm init -y
2. npm install express --save
3. ng new d3
4. cd d3
5. npm install d3 --save
6. npm install @types/d3 --save
(Yes, this means we are installing new node modules into Angular!)
7. ng g component bar
8. ng g component pie
9. ng g component scatter
10. Add all components to src/app/app.component.html
11. Add some nice global CSS to src/index.html (see lines 9 and 10)
12. Create a basic Node server.js file to serve the files Angular will build
13. Edit src/app/bar/bar.component.html
14. Add data+logic to bar.component.ts
15. Repeat steps 13+14 for pie
16. Repeat steps 13+14 for scatter
17. ng build
18. npm start
19. See the visualization!

But what if...
--------------
What if we could just get data from a REST API endpoint instead of hardcoding?
Check the bar component again to see one way to do that.

Credits
-------
https://blog.logrocket.com/data-visualization-angular-d3/
