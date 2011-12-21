# -*- coding: utf-8 -*-  

from django.shortcuts import render_to_response
from django.template import RequestContext

def index(request):
    """Index function fo main page"""
    context = {}
    #TODO: Создать вывод главной страници
    return render_to_response("page/index.html", context, context_instance=RequestContext(request))