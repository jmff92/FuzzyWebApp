class OrderingsController < ApplicationController

	def orderings
		connection = ActiveRecord::Base.connection();
		query = "SELECT testing.id,
				information_schema_fuzzy.fuzzy2_tostring(testing.value) AS
				value_human_readable FROM testing"
		@data = connection.execute(query);
	end

end
