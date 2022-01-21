To start this lab, I first looked around for RSS feeds. This actually took a little bit to do
since most of the ones I was finding were pretty small and I didn't want to wait for them to 
update clearly. Eventually I used the NYT's RSS feeds and combined them all in to one really 
large file (all extra XML is in the folder extra_xml). I then converted the file to JSON.
After that I spent a while just reading bootstrap and figuring out how I wanted things to look.
I found the carousel component, which was perfect for cycling through stuff. I also found the media
component, which was a good look. After that I got stuck in my first place. Trying to format things
in bootstrap took a long time to get used to. It's really weird to use very little css and have
bootstrap classes do almost all the work. I also didn't link all the bootstrap JS correctly so I 
spent a whilefixing that. After that I struggled a lot with the media container because the image was 
always ontop even though in all the examples it was to the left, even though the code is the exact same. 
I honestly got really really frusterated at this and had to take a break.

It's now the next day. I was able to fix the media problem (I had to add a display flex onto it). 
Then I started to work on the basic layout of the content for each article. I saw that the NYT's
descriptions were small but they had tags, so I thought I'd add the tags for a little creativity.
The next problem was to figure out how I want to display 5 articles. I settled on having 5 media
tags within the carousel. I also added a title and a background. I found the carousel transition
to not be smooth and I didn't know why, so I found a workaround in making it fade instead.

Next, I went to work on making all the carousel items it'll cycle through. I spent a long time
refreshing myself on JS, especially on the best way to make new elements in JQuery. I looped through
all the elements in the json by fives and then for each five I loaded up all the html using JQuery's
element constructor and append(). Because I tested out all the JQuery and JSON things that I weren't 
confinent in before I coded everything, there was surprisingly little issue here. 

Finally, there were a few visual bugs that I had to fix, such as when there was no image or
the fact that the images were poking over the border-radius.

Sources:
* https://www.nytimes.com/
* https://getbootstrap.com/
* https://www.w3schools.com/jquery/jquery_css_classes.asp
* https://stackoverflow.com/questions/2342371/jquery-loop-on-json-data-using-each
* https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery
* https://api.jquery.com/
* https://www.convertjson.com/xml-to-json.htm
* https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius