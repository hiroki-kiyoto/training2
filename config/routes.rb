Rails.application.routes.draw do
  devise_for :users
  root 'posts#index'
  resources :posts do
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
  end
  resources :users ,only: [:show]
  resources :relationships, only: [:create, :destroy]
end
