# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'
from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('game.views',
    url(r'^$', 'index'),

)
