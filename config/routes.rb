Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: { format: 'json' } do
    resources :feeds, only: [:create, :destroy, :show, :index]
    resources :articles, only: [:create, :destroy, :show, :index]
    resource :saves, only: [:destroy]
    resources :collections, only: [:create, :destroy, :index, :show]
    resource :collectionings, only: [:create, :destroy, :show]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get '/', to: 'static_pages#index'
  get 'splash', to: 'static_pages#splash'
end
