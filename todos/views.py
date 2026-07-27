from django.shortcuts import render
from django.http import HttpResponse
from .models import TODO_data
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required



@login_required(login_url='/login')
def home_page(request):
    data = TODO_data.objects.filter(user=request.user)
    return render(request, 'home_page.html', { 'data': data})

@login_required(login_url='/login')
def delete_task(request, id):
    task = get_object_or_404(
        TODO_data,
        id=id,
        user = request.user
    )

    task.delete()

    return redirect("home")

@login_required(login_url='/login')
def create_task(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')

        TODO_data.objects.create(
            user = request.user,
            title=title,

            description=description

        )

    return redirect("home")

@login_required(login_url='/login')
def complete_task(request, id):
    task = get_object_or_404(
        TODO_data,
        id=id,
        user = request.user
    )
    task.status = not task.status
    task.save()
    return redirect("home")

@login_required(login_url='/login')
def edit_task(request, id):

    task = get_object_or_404(
                    TODO_data,
                    id=id,
                    user = request.user
            )

    if request.method == 'POST':

        task.title = request.POST["title"]
        task.description = request.POST["description"]

        task.save()

    return redirect("home")

def hm_pg(request):
    return redirect('/home')