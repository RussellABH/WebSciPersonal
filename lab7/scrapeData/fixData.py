import json

# Set up files
allGames = json.load(open("scrapeData/gamesResult.json", "r"))
newFile = open("scrapeData/fixedData.json", "w")

# Write the data
newFile.write("[")
for game in allGames:
    # Checking for the console being PC or ALL and it having a critic score
    if (len(game["console"]) > 0 and (game["console"][0] == "PC" or game["console"][0] == "ALL"))\
         and game["critic_score"][0].strip() != "N/A":
        json.dump(game, newFile)
        newFile.write(", ")
newFile.write("]")

# Note that the file will not be correct as you will have to remove the last comma manually