import os


def rel(*x):
    return os.path.join(os.path.abspath(os.path.dirname(__file__)), *x)


ADMINS = (
    # ('Your Name', 'your_email@domain.com'),
)
ROOT_URLCONF = 'urls'
MANAGERS = ADMINS
TIME_ZONE = 'Russia/Moscow'
LANGUAGE_CODE = 'ru-ru'
SITE_ID = 1
USE_I18N = True
USE_L10N = True

MEDIA_URL = ''
ADMIN_MEDIA_PREFIX = '/media/'
SECRET_KEY = 'ko*ab!agt)^db5*us__oe0ze_zko1cqv7cj)*)qxlq309aj$dj'

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Manual setup
    'cron',
    'index',

)



TEMPLATE_DIRS = (rel('../templates/'),)
MEDIA_ROOT = rel('../media/')
