class OrderingsController < ApplicationController

	def orderings
		# query = "SELECT codigo_pokedex_nacional,
		# 		information_schema_fuzzy.fuzzy2_tostring(pokemon.value) AS
		# 		value_human_readable FROM pokemon"
		if (flash[:dataQ] == 'complete')
			@data = @@data
		else
			@data = {}
		end
	end

	def queryBuilderOrdering
		@query = {}
		@query[:select] = "codigo_pokedex_nacional, nombre, poder_base_estimado"
		@query[:order] = params[:order]
		@query[:using] = params[:using]


		connection = ActiveRecord::Base.connection();
		if (@query[:using] == 'CENTROID')
			q1 = "UPDATE information_schema_fuzzy.current_orderings2 SET ordering = 2"
			connection.execute(q1)
		end
		if (@query[:using] == 'CHOQUET')
			q1 = "UPDATE information_schema_fuzzy.current_orderings2 SET ordering = 1"
			connection.execute(q1)
		end

		q2 = "SELECT #{@query[:select]} FROM pokemon ORDER BY poder_base_estimado #{@query[:order]}"
		@@data = connection.execute(q2)

    q3 = "UPDATE information_schema_fuzzy.current_orderings2 SET ordering = 3"
    connection.execute(q3)
	
		respond_to do |format|
			flash[:dataQ] = 'complete'
			flash[:order] = params[:order]
			flash[:using] = params[:using]
			format.html { redirect_to :action => :orderings }
		end

	end

end
