Rails.application.routes.draw do
  root to: "static_pages#splash"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
