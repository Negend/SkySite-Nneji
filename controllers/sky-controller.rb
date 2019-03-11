class SkyController < Sinatra::Base

  # sets root as the parent-directory of the current file
  set :root, File.join(File.dirname(__FILE__), '..')
  
  # sets the view directory 
  set :views, "views" 
  set :public_folder,"public"


	get '/' do
		@home = true
		erb :'pages/index'  
	end

  get '/pages/upload'  do     
    erb :'pages/upload' 
  end  
  
  get '/Programs/sample'  do     
    redirect '/Programs/program-list.xml' 
  end  
  
  post '/' do    
    File.open('public/Programs/program-list.xml', "w") do |f|
    	f.write(params[:tfile][:tempfile].read)
	  end  
    redirect '/'
  end
  


end