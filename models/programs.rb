class Programs
	attr_reader :list,:programDisplayed

	def initialize
		@list = []
		@programDisplayed = []
	end

	def add_program program
		@list.push program
	end
	def updateDisplay chosenMoods
		moodprograms = []

		for x in 0...chosenMoods.length 
			for p in 0...@list.length 
				if @list[p].mood == chosenMoods[x]
					moodprograms.push @list[p]
				else 
				end
			end
		end
		if self.list.length == 0
			return
		elsif moodprograms.length == 0 
			moodprograms = self.list
		end
		random = Random.new
		@programDisplayed = []
		for n in 0..4
			m = moodprograms.length
			i = random.rand(1..m)
			@programDisplayed.push moodprograms[i-1]
			moodprograms.delete_at i-1
		end
	end
	def self.getMood m1,m2,m3,m4
		moodList = [
		    {first:"HAPPY",second:"SAD"},
		    {first:"AGITATED",second:"CALM"},
		    {first:"AWAKE",second:"TIRED"},
		    {first:"FEARLESS",second:"SCARED"}
    	]
    	moods = []
    	input = [m1,m2,m3,m4]
    	for i in 0...moodList.length
			if input[i] == "1"		
				 x = moodList[i][:first]
				moods.push x			
			elsif input[i] == "3"
				 x = moodList[i][:second]
				moods.push x
			end
		end
		moods
	end
end