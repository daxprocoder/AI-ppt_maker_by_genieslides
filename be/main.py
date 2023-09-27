import powerpoint 
import time
#calculate the time taken to run the program
start_time = time.time()

import sys
decision = None
Title = None
wordcount = None
tone = None
language = None
keywords = None
key = None

if len(sys.argv) > 1:
    decision = sys.argv[1]
    Title = sys.argv[2]
    wordcount = sys.argv[3]
    wordcount = int(wordcount)
    tone = sys.argv[4]
    language = sys.argv[5]
    #keywords are in the form of a list and are separated by a comma so we read all the arguments and then split them by comma
    #and create a list of keywords
    keyword = sys.argv[6:]

    if keyword == '':
        key = 0
        keywords = {}
    else:
        keyword = ','.join(keyword)
        #check if no keyword
        key = len(keyword.split(','))
        keywords = {}
        for i in range(key):
            keywords[i] = keyword.split(',')[i]

#run command python main.py a "title" 100 "tone" "en" "keyword1,keyword2,keyword3"
#print all the arguments
# print(decision)
# print(Title)
# print(wordcount)
# print(tone)
# print(language)
# print(keywords)
# print(key)
powerpoint.ppt_detail(Title,wordcount,language,tone,decision)

powerpoint.ppt_keywords(key,keywords,Title,wordcount,language,tone,decision)
end_time = time.time()
final_time = end_time - start_time
print(final_time)