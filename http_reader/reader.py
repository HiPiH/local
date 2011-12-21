# -*- coding: utf-8 -*-  
__author__ = 'Aleksey.Novgorodov'

from urllib2 import urlopen,Request
from urlparse import urljoin
from urllib  import urlencode
from django.utils import simplejson

def Get(text, since_id=None, until=None, geocode=None, rpp=2, locale='ru', show_user='true'):
    """Create url to tweet"""

    param = {
        'locale':locale,
        'result_type':'mixed',
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
    url = urlopen(req)
    dict =  simplejson.loads(url.read())
    return dict




ret = Get("#россия")
for i in ret["results"]:

    if "text" in i.keys():
        print i["text"]
    if "id" in i.keys():
        print i["id"]
    if "id" in i.keys():
        print i["id"]
    print '-'*30
