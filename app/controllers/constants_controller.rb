class ConstantsController < ApplicationController

	def constants
		connection = ActiveRecord::Base.connection();
		query = "SELECT information_schema_fuzzy.constants2.constant_name,
 				information_schema_fuzzy.constants2.value
				FROM information_schema_fuzzy.constants2";
		@cons = connection.execute(query);
	end

end
