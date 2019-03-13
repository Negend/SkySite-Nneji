class SkyController < Sinatra::Base

  # sets root as the parent-directory of the current file
  set :root, File.join(File.dirname(__FILE__), '..')
  
  # sets the view directory 
  set :views, "views" 
  set :public_folder,"public"


  programs = Programs.new 
  get '/' do
    mood = []
    programs.updateDisplay mood
    @programs = programs.programDisplayed
    if@programs.length ==0
      program=Program.new "No Content","/images/no_content.png","mood"
      @programs = [
        program,
        program,
        program,
        program,
        program
      ]
    end
    @home = true
    erb :'pages/index'  
  end

	post '/' do    
      mood = Programs.getMood params[:mood1],params[:mood2],params[:mood3],params[:mood4]
      puts params[:mood1]
      programs.updateDisplay mood
      @programs = programs.programDisplayed
    if@programs.length ==0
      program=Program.new "No Content","/images/no_content.png","mood"
      @programs = [
        program,
        program,
        program,
        program,
        program
      ]
    end
    erb :'pages/index'  
	end

  get '/pages/upload'  do     
    erb :'pages/upload' 
  end  
  
  get '/Programs/sample'  do     
    redirect '/Programs/program-list.xml' 
  end  
  
  post '/upload' do    
    File.open('public/Programs/program-list.xml', "w") do |f|
    	f.write(params[:tfile][:tempfile].read)
	  end  
    print programs.list
    doc = Nokogiri::XML(File.open("public/Programs/program-list.xml"))
    p = doc.xpath('//PROGRAM')
    for i in 0...p.length
      program = Program.new(p[i].xpath('TITLE').children[0].to_s,p[i].xpath('IMAGE').children[0].to_s,p[i].xpath('MOOD').children[0].to_s)
      programs.add_program program
    end
    redirect '/'
  end
  


end