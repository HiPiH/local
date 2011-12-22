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
    for word in TweetWords.objects.all().values('words'):
        result =  Get(word['words'])
        if "results" in result.keys():
            for result in result["results"]:
                ret+= result["text"] +"</br>"

    return HttpResponse(ret)

