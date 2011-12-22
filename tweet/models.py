from django.db import models
from django.utils.translation import ugettext as _

# Create your models here.
class TweetWords(models.Model):
    words   = models.CharField('words',blank=False,null=False,unique=True,max_length=50)
    dt      = models.DateTimeField('create',auto_now_add=True)
    langs   = models.OneToOneField('TweetLang',blank=False,null=False)
    def __unicode__(self):
        return u"%s" % self.words

    def get_lang(self):
        """Returne leng to words"""
        return self.langs.lang
    
    class Meta:
        verbose_name='Word'
        

class TweetLang(models.Model):
    name= models.CharField('name',max_length=50)
    lang = models.CharField('lang',max_length=5)
    def __unicode__(self):
        return u"%s" % self.name