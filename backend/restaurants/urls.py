from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name = 'index'),
    path('new/', views.create, name ='create-restaurant'),
    path('update/<int:restaurant_id>', views.update_restaurant),
    path('delete/<int:restaurant_id>', views.delete_restaurant)
]
