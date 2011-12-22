# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'
from django.contrib.admin import site,ModelAdmin
from models import TweetWords,TweetLang



site.register(TweetLang)
site.register(TweetWords)