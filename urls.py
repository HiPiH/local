import cron
from django.conf.urls.defaults import patterns, include
from django.contrib import admin


admin.autodiscover()
cron.autodiscover()

urlpatterns = patterns('',
    (r'^', include('index.urls')),
    (r'^admin/', include(admin.site.urls)),
)
