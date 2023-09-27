import openai
from googletrans import Translator
from spellchecker import SpellChecker


# GPT main-----------------------------------------//
openai.api_key = "sk......"
model_engine = "text-davinci-002"


def chat(prompt):
  completions = openai.Completion.create(
      engine=model_engine,
      prompt=prompt,
      max_tokens=1024,
      n=1,
      stop=None,
      temperature=0.5,
  )

  message = completions.choices[0].text
  return message

# ----------------------------------------------------//


def translate_title(title, Language):
    translater = Translator()
    word = title
    out = translater.translate(word, dest=Language)
    return out.text




def title_overview(title,wordcount,language,tone):
    # if language == "english":
    #     spell = SpellChecker(language="en")
    #     misspelled_words = spe+ll.unknown(title)
    #     for word in misspelled_words:
    #         title = spell.correction(word)
    # else:
    #     pass        
    if wordcount == 100:
        prompt = ("Write a brief not on"+title+"in 100 words in "+language+" language"+tone+" tone")
        response = chat(prompt)
        return response
    elif wordcount >= 100:
        wordcount = str(wordcount)  
        prompt = ("Write a brief not on"+title+"in"+wordcount+"words in "+language+" language"+tone+" tone")
        response = chat(prompt)
        return response
    else:
        print("Sorry we cant write less than 100 words")
        exit()

    
def catch_title(title,language):
    prompt = ("write a nice title for ppt presentation on  "+title+" in "+language+" language")
    response = chat(prompt)
    return response




def keyword_overview(keyword,wordcount,language,tone):
    if wordcount == 100:
        prompt = ("Write a brief not on"+keyword+"in 100 words in "+language+" language"+tone+" tone")
        response = chat(prompt)
        return response
    elif wordcount >= 100: 
        wordcount = str(wordcount) 
        prompt = ("Write a brief not on"+keyword+"in"+wordcount+"words in "+language+" language"+tone+" tone")
        response = chat(prompt)
        return response
    else:
        print("Sorry we cant write less than 100 words")
        exit()
    