
import settings
from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from django_evolution.models import Version,Evolution

admin.autodiscover()

admin.site.unregister((Version,Evolution))




urlpatterns = patterns('',
    url(r'^', include('index.urls')),
    url(r'^', include('tweet.urls')),
    url(r'^media/(?P<path>.*)$',
            'django.views.static.serve',
            {
                'document_root': settings.MEDIA_ROOT,
                'show_indexes':False,
            }
    ),
    url(r'^admin/', include(admin.site.urls),name='admin'),
)
