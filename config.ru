require 'sinatra'
require 'pg'
require 'pry' 
require 'shotgun'
require 'Nokogiri'
require_relative './models/programs.rb'
require_relative './models/program.rb'
require_relative './controllers/sky-controller.rb'

use Rack::MethodOverride

run SkyController
