require 'sinatra'
require 'pg'
require 'pry' 
require 'shotgun'
require_relative './models/too.rb'
require_relative './controllers/sky-controller.rb'

use Rack::MethodOverride

run SkyController