from django.shortcuts import render
from django.http import HttpResponse
from .models import TODO_data
from django.shortcuts import redirect, get_object_or_404



#def home_page(request):
#    return render(request, 'home_page.html')
    
def about_page(request):
    data = TODO_data.objects.all()
    return render(request, 'home_page.html', { 'data': data})

def delete_task(request, id):
    task = get_object_or_404(
        TODO_data,
        id=id
    )

    task.delete()

    return redirect("/about")


def create_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')

        TODO_data.objects.create(
            title=title,

            description=description

        )

    return redirect("/about")