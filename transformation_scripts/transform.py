import json

results = {}

# Word,Seq_num,Word Count,Word Proportion,Average Proportion,Std Dev,Doc Count,Negative,Positive,Uncertainty,Litigious,Strong_Modal,Weak_Modal,Constraining,Syllables,Source
f = open("Loughran-McDonald_MasterDictionary_1993-2021.csv", "r")
for x in f:
  columns = x.strip("\n").split(",")
  word = str(columns[0]).lower()
  # print(str(columns))
  information = []
  negative = int(columns[7])
  if negative > 0:
    information.append("negative")
    
  positive = int(columns[8])
  
  if positive > 0:
    information.append("positve")
    
  
  litigious = int(columns[9])
  
  if litigious > 0:
    information.append("litigious")
    
  strong_modal = int(columns[10])
  
  if strong_modal > 0:
    information.append("strong_modal")
    
  weak_modal = int(columns[11])
  
  if weak_modal > 0:
    information.append("weak_modal")
    
  constraining = int(columns[12])
  
  if constraining > 0:
    information.append("constraining")
  
  # information = {
  #   "negative": negative,
  #   "postive": positive,
  #   "litigious": litigious,
  #   "strong_modal": strong_modal,
  #   "weak_modal": weak_modal,
  #   "constraining": constraining
  # }
  
  if len(information) != 0:
    results[word] = information
  
  # results["negative"] = columns[8]
  
# print(results)

f = open("loughran1993-2021_en.json", "w")
f.write(json.dumps(results))
f.close()


# print(results["MODS"])