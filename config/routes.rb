Rails.application.routes.draw do
  root 'tops#index'

  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
  
  post 'timers/start', to: 'timers#start'
  post 'break_times/pause', to: 'break_times#pause'
  post 'break_times/resume', to: 'break_times#resume'
  post 'timers/end', to: 'timers#end'

  resources :users, only: %i[new create]
  resources :timers, only: %i[new create update]

end
