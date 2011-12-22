# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'
from django.contrib.admin import site,ModelAdmin
from models import TweetWords
from django.utils.translation import ugettext as _



    
site.register(TweetWords)