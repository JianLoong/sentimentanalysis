import json

results = {}

# Word,Seq_num,Word Count,Word Proportion,Average Proportion,Std Dev,Doc Count,Negative,Positive,Uncertainty,Litigious,Strong_Modal,Weak_Modal,Constraining,Syllables,Source
f = open("lemmatization-en.txt", "r")
for x in f:
  columns = x.strip("\n").split("\t")
  word = str(columns[0]).lower()
  # print(str(columns))
  results[columns[1]] = word

f = open("lemmatization.json", "w")
f.write(json.dumps(results))
f.close()


# print(results["MODS"])