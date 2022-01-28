I started with looking into HTML5 geolocation. This wasn't too hard to implement luckily. However, there was 
a decent number of different errors that could occur, so I decided to use bootstrap alerts to show an error
if one occured for creativity. Next, I started getting the API working. I initally had a 401 error code, but that's because
I had my API key encompassed in brackets. After getting that fixed, I looked through the data and the response
header. I honestly didn't find anything of interest in the response header. Looking through the data, I decided
that I would use the icons, temperature, humidity, and wind parts of it. With that in mind, I coded the html/css
with static data mostly using bootstrap. This took a decent bit, mostly because I didn't know what I wanted it to
look like. When that was done, I was able to add in the api data without too much issue. However, I noticed that 
sometimes it took a while for the data to fully load (I think from HTML5 geolocation), so I decided to add a nice
loading icon until the data comes in, also for creativity. 

The first API that I looked at was InSight, the Mars Weather Service API. Why get weather data for your current 
location when you can get it for Mars, provided by NASA? In regards to how the data is organized, it's actually
a relatively simple API. There is only one endpoint):
https://api.nasa.gov/insight_weather/?api_key=API_KEY&feedtype=json&ver=1.0. However, there is more complexity
in the JSON object it returns. The first thing one should access from the data are "sol keys". These are numbers
that represent each sol (a mars day) that they have recorded recently. From there, you take one of these keys and
then get that index of the json object to get the data for that sol. Initally, I thought this was honestly a weird
way of doing it instead of having a more intuitive sol selector that one would add to the URL of the API call. 
However, thinking on it more this probably makes more sense because they likely want to limit the number of calls 
to their API, so it's more simple to send essentailly all the data at once than to require multiple connections. 
This is reinforced by their API rate limit of 1000 requests an hour, which is relatively small compared to other APIs. 

The next API I looked at was PokeApi, an API for getting Pokemon data. The URL looks something like this:
https://pokeapi.co/api/v2/{group}/{id or name}. Note that there's no API key, which I find 
interesting. Maybe they either don't get enough traffic or are able to handle it well. In regards to the way 
it's organized, I honestly think it's much too "wide". It's always just one group, and it never goes 
deeper. There are also a lot of groups that you can get data from (45 to be exact). Personally, I think it would
make more sense if they added depth to the url. They even have it organized in groups for the documentation. 
For example, instead of https://pokeapi.co/api/v2/item-attribute/{id or name}/ it should be 
https://pokeapi.co/api/v2/item/attribute/{id or name}/. 

The final API I'll look at is QuickChart. This API "generates chart images on-the-fly", which are suitable for
embedding. This API also seems to not require API keys. Personally I think this is even harder to understand, 
since generating charts seems more computationally intensive than just sending back data. But clearly it works
out for them, so it's probably not a bad thing. The API also seems to only have one "main" endpoint:
https://quickchart.io/chart. However, this honestly makes sense. As a part of this endpoint, you end them
a JSON object in the URL that has the data of the chart that you wish to make. For example, a simple bar
graph would look like this - https://quickchart.io/chart?bkg=white&c={type:%27bar%27,data:{labels:[2012,2013,2014,2015,2016],datasets:[{label:%27Users%27,data:[120,60,50,180,120]}]}}. It's an interesting way of going about it and results in long urls. But honestly I can't 
think of a better way to do it. There are a few other interesting elements, such as the ability to send a POST
request instead of a GET request for really large charts, a different endpoint that returns a short url, 
templates, and other features. This is a good example of an API with only one "main" endpoint but makes
the most of it.


References 
* https://getbootstrap.com/docs/5.1/
* https://stackoverflow.com/questions/50501047/one-line-arrow-functions-without-braces-cant-have-a-semicolon
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
* https://www.w3schools.com/html/html5_geolocation.asp
* https://cssgradient.io/gradient-backgrounds/
* https://api.jquery.com/
* https://www.w3schools.com/css/css_positioning.asp
* https://stackoverflow.com/questions/6626314/center-an-item-with-position-relative
* https://openweathermap.org/
* https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-icons.php
* https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf
* https://pokeapi.co/docs/v2
* https://quickchart.io/documentation/