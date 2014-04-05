Reminders::Application.routes.draw do

  get "lembretes/sincronizar"

  resources :lembretes

end
