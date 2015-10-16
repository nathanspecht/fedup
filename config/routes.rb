Rails.application.routes.draw do
  root to: "static_pages#splash"

  namespace :api, defaults: { format: 'json' } do
    resources :feeds, only: [:create, :destroy, :show, :index]
    resources :articles, only: [:create, :destroy, :show, :index]
    resource :saves, only: [:destroy]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  resources :static_pages, only: [:index]
end
