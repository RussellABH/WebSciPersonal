function loadAll() {
    $.getJSON("main.json", (data) => {
        // Get the main data (the articles)
        let channelData = data['rss']['channel']['item'];

        // Loop over the articles every five since we're going 5 at a time
        for (let i = 0; i < channelData.length; i += 5) {
            // console.log(channelData[i]);

            let carousel_item = (i == 0 ? 
                $("<div>", {"class": "carousel-item active"}) : 
                $("<div>", {"class": "carousel-item"}));

            // Loop over the 5 in this set and create the html
            for (let j = 0; j < 5 && (i + j) < channelData.length; j++) {
                let currentArticle = channelData[i + j];

                // Element where the rest will go
                let media = $("<div>", {"class": "media d-flex" });
                
                // Not all articles have an image
                let content = (currentArticle['content'] ? 
                    currentArticle['content']['_url'] :
                    "nothing.png");
                let img = $("<img>", {"class": "pr-3 articleImage", "src": content, "alt": "" });
                media.append(img);
                
                // Make the media body
                let media_body = $("<div>", {"class": "media-body"});
                let media_title = $("<h5>", {"class": "mt-0 link-primary" });
                let title_link = $("<a>", {"href": currentArticle['guid']['__text']});
                title_link.append(currentArticle['title']);
                media_title.append(title_link);
                media_body.append(media_title);

                // Add description
                media_body.append(currentArticle['description']);

                // Make the tag list
                let tag_list = $("<ul>", {"class": "list-group list-group-horizontal" });
                $.each(currentArticle['category'], (i, item) => {
                    let list_item = $("<li>", {"class": "list-group-item"});
                    list_item.append(item['__text']);

                    tag_list.append(list_item);
                });
                media_body.append(tag_list);

                // Add all to media element
                media.append(media_body);

                // Add media element to the carousel_item
                carousel_item.append(media);
            }

            // Append carousel_item to the actual html
            $("#theCarouselInner").append(carousel_item)
        }
    });
}

loadAll();