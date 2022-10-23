import json

results = {}

# Word,Seq_num,Word Count,Word Proportion,Average Proportion,Std Dev,Doc Count,Negative,Positive,Uncertainty,Litigious,Strong_Modal,Weak_Modal,Constraining,Syllables,Source
f = open("NRC-VAD-Lexicon.txt", "r")
a = 0
for x in f:
  columns = x.strip("\n").split("\t")
  word = str(columns[0]).lower()
  # print(str(columns))
  valence = (columns[1]);
  arousal = (columns[2]);
  dominance = (columns[3]);
  
  # information = {
  #   "valence" : valence,
  #   "arousal" : arousal,
  #   "dominance" : dominance
  # }
  
  results[word] = [float(valence), float(arousal), float(dominance)]


f = open("nrcvad_en.json", "w")
f.write(json.dumps(results))
f.close()


# print(results["MODS"])