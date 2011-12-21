# -*- coding: utf-8 -*-
__author__ = 'Aleksey.Novgorodov'
from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('index.views',
    url(r'^$','index',name="index_index"),
)
