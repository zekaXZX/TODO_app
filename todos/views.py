from django.shortcuts import render
from django.http import HttpResponse
from .models import TODO_data
from django.shortcuts import redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse



@login_required(login_url='/login')
def home_page(request):
    data = TODO_data.objects.filter(user=request.user).order_by("date")
    completed_tasks = data.filter(status=True).count()
    uncompleted_tasks = data.filter(status=False).count()
    return render(request, 'home_page.html', { 'data': data, 'completed_tasks': completed_tasks, 'uncompleted_tasks': uncompleted_tasks})

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
        category = request.POST.get('category')

        TODO_data.objects.create(
            user = request.user,
            title=title,

            description=description,
            category=category,

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
    return redirect(f"{reverse('home')}#task-{task.id}")

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
        task.category = request.POST["category"]

        task.save()

    return redirect("home")

def hm_pg(request):
    return redirect('/home')