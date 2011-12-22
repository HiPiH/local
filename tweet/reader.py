# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'

from urllib2 import urlopen,Request
from urlparse import urljoin
from urllib  import urlencode
from django.utils import simplejson

def Get(text, since_id=None, until=None, geocode=None, rpp=1000, locale='ru', show_user='true',json=True,result_type='mixed'):
    """Create url to tweet"""
    if type(text) is unicode:
        text = text.encode('utf8')

    param = {
        'lang':locale,
        'result_type':result_type,
        'rpp':rpp,
        'show_user':show_user,
        'q':text,
    }
    if since_id:
        param["since_id"] = since_id
    if until:
        param["until"] = until #'2010-03-28'
    if geocode:
        param["geocode"] = geocode 
    req =  Request('http://search.twitter.com/search.json',  urlencode(param))
    print urlencode(param)
    url = urlopen(req)
    dict = url.read()
    if json:
        dict = simplejson.loads(dict)


    return dict



'''
ret = Get("#россия")
for i in ret["results"]:
    print i.keys()
    if "text" in i.keys():
        print i["text"]
    if "id" in i.keys():
        print i["id"]
    if "id" in i.keys():
        print i["id"]


    print '-'*30
'''