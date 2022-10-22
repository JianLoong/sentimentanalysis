import json

results = {}

f = open("Bing.csv", "r")
for x in f:

  columns = x.strip("\n").split(",")
  result = {str(columns[0]), str(columns[1])}
  results[columns[0]] = columns[1]
  
print(results)

f = open("bing.json", "w")
f.write(json.dumps(results))
f.close()
