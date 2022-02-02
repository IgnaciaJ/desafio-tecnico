from .models import Restaurant
from django.http import HttpResponse
from .forms import RestaurantCreate
from django.views.decorators.csrf import csrf_exempt
import json

def jsonForm(req):
    return json.loads(req.body.decode('utf-8'))

def index(request):
    response = HttpResponse(Restaurant.objects.all())
    response.status_code = 200
    return response


@csrf_exempt
def create(request):
    restaurant = RestaurantCreate()
    if request.method == 'POST':
        restaurant = RestaurantCreate(jsonForm(request))
        if restaurant.is_valid():
            restaurant.save()
            response = HttpResponse(restaurant.instance)
            response.status_code = 201
            return response

        else:
            response = HttpResponse("""
            No se ha podido agregar el restaurant, intenta nuevamente
            """)
            response.status_code = 400
            return response
    else:
        response = HttpResponse("no existe este metodo")
        response.status_code = 400
        return response


@csrf_exempt
def update_restaurant(request, restaurant_id):
    restaurant_id = int(restaurant_id)
    if request.method == 'PATCH':
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            response = HttpResponse("no existe este restaurant")
            response.status_code = 404
            return response

        restaurant_form = RestaurantCreate(jsonForm(request), instance = restaurant)
        if restaurant_form.is_valid():
            restaurant_form.save()
            response = HttpResponse(request)
            response.status_code = 200
            return response
    else:
        response = HttpResponse("no existe este metodo")
        response.status_code = 400
        return response

@csrf_exempt
def delete_restaurant(request, restaurant_id):
    restaurant_id = int(restaurant_id)
    if request.method == 'DELETE':
        try:
            restaurant = Restaurant.objects.get(id=restaurant_id)
        except Restaurant.DoesNotExist:
            response = HttpResponse("no existe este restaurant")
            response.status_code = 404
            return response
        restaurant.delete()
        response = HttpResponse(f"¡{restaurant.name} se elimino correctamente!")
        response.status_code = 200
        return response
    else:
        response = HttpResponse("no existe este metodo")
        response.status_code = 400
        return response
