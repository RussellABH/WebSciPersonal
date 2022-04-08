import json

# Set up files
oldFileJson = json.load(open("scrapeData/fixedData.json", "r"))
newFile = open("scrapeData/fixedDataNoLists.json", "w")

# Counter vars
numWithShipped = 0
numWithSales = 0
numWithBoth = 0
numWithNone = 0

# Write the data
newFile.write("[")
for game in oldFileJson:
    # Remove lists of length 1
    for key, value in game.items():
        if type(value) is list:
            # print("found list", flush=True)
            game[key] = value[0]

    # Metrics on sales
    flag = True
    if game["total_shipped"].strip() != "N/A":
         numWithShipped += 1
         flag = False
    if game["total_sales"].strip() != "N/A": 
        numWithSales += 1
        flag = False
    if game["total_sales"].strip() != "N/A" and game["total_shipped"].strip() != "N/A":
        numWithBoth += 1
        flag = False
    if flag: 
        numWithNone += 1
    
    # Combine sales metrics and remove those without any
    if (game["total_sales"].strip() != "N/A" or game["total_shipped"].strip() != "N/A") and game["release_date"].strip() != "N/A":
        if game["total_sales"].strip() != "N/A":
            game["total_sold"] = game["total_sales"][:-1]
        elif game["total_shipped"].strip() != "N/A":
            game["total_sold"] = game["total_shipped"][:-1]

        json.dump(game, newFile)
        newFile.write(", ")
        
newFile.write("]")

print("Shipped:", numWithShipped)
print("Sales:", numWithSales)
print("Both:", numWithBoth)
print("None:", numWithNone)
# Note that the file will not be correct as you will have to remove the last comma manually
