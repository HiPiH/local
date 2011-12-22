from django.db import models
from django.utils.translation import ugettext as _

# Create your models here.
class TweetWords(models.Model):
    words = models.CharField(_('words'),blank=False,null=False,unique=True,max_length=50)
    dt =   models.DateTimeField(_('create'),auto_now_add=True)

    __unicode__ = lambda self: u"%s" % self.words

    class Meta:
        verbose_name=_('Word')
        
    