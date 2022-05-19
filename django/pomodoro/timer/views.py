from django.http import HttpResponse
from django.template import loader

from .models import Timer

# Create your views here.
def index(request):
    latest_timer = Timer.objects.order_by('-start_time')[0]
    template = loader.get_template('timer/index.html')
    context = {
        'latest_timer_id': latest_timer.id,
    }
    return HttpResponse(template.render(context, request))

def detail(request, timer_id):
    return HttpResponse(f"You're looking at timer {timer_id}")

