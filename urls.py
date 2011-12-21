from django.conf.urls.defaults import patterns, include

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^', include('index.urls')),
    (r'^admin/', include(admin.site.urls)),
)
