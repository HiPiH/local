# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'

from reader import  Get
from tweet.models import TweetWords
from django.http import  HttpResponse

def get_words(request):
    """
        Functyion chak word
    """
    ret = ""
    for word in TweetWords.objects.all():
        results =  Get(word.words,result_type="popular",locale=word.get_lang())
        print results
        if "results" in results.keys():
            for result in results["results"]:
                ret+= "<b>%s[%s](%s)</b>:%s</br>"%(result["from_user"],result["iso_language_code"],result["metadata"]["result_type"],result["text"])

    return HttpResponse(ret)

