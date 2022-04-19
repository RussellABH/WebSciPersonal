import json

# Set up files
allGamesFile = json.load(open("all_games.json", "r", encoding="utf-8"))
twitchFile = json.load(open("twitch_game_data.json", "r", encoding="utf-8"))
newFile = open("combined.json", "w")

# Make my score
scoreDict = dict()
for game in twitchFile:
    if scoreDict.get(game['Game']):
        scoreDict[game['Game']] += 201 - game['Rank']
    else:
        scoreDict[game['Game']] = 201 - game['Rank']

# Write the data
newFile.write("[")
idCounter = 0
for game in allGamesFile:
    if scoreDict.get(game['name']):
        idCounter += 1
        game['id'] = idCounter
        game['score'] = scoreDict[game['name']]
        newFile.write(json.dumps(game))
        newFile.write(",")
newFile.write("]")
# Note that the file will not be correct as you will have to remove the last comma manually
