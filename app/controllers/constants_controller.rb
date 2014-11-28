class ConstantsController < ApplicationController

	def constants
		# query = "SELECT information_schema_fuzzy.constants2.constant_name,
 				# information_schema_fuzzy.constants2.value
				# FROM information_schema_fuzzy.constants2";
		# @cons = connection.execute(query);
		if session[:created].nil?
			session[:ident] = request.session_options[:id]
			session[:created] = true
		end

		if (flash[:constantsQ] == 'complete')
			@data = @@consts
		else
			@data = {}
		end

	end

	def createByTrap
		name = params[:name]
		x1 = params[:x1]
		x2 = params[:x2]
		x3 = params[:x3]
		x4 = params[:x4]
		connection = ActiveRecord::Base.connection()
		q1 = "INSERT INTO information_schema_fuzzy.constants2 
		(constant_schema, domain_name, constant_name, value, fuzzy_type) 
		VALUES ('NULL', 'fuzzyint','#{name}-#{session[:ident]}',ROW(ARRAY[0.0, 1.0, 1.0, 0.0], 
		ARRAY[#{x1}, #{x2}, #{x3}, #{x4}], '0'), 'NULL')"
		q2 = "SELECT EXISTS 
		(SELECT 1 FROM information_schema_fuzzy.constants2 
			WHERE constant_name = '#{name}-#{session[:ident]}' AND domain_name = 'fuzzyint' 
			AND constant_schema = 'public' LIMIT 1)"
		q3 = "SELECT EXISTS 
		(SELECT 1 FROM information_schema_fuzzy.domains2 WHERE domain_name = 'fuzzyint' LIMIT 1);"
		q4 = "UPDATE information_schema_fuzzy.constants2 
		SET constant_schema = 'public', fuzzy_type = 'fuzzytrapezoid' 
		WHERE constant_schema = 'NULL';"

		begin
			connection.execute(q1)
			connection.execute(q2)
			connection.execute(q3)
			connection.execute(q4)
		rescue
		end
	end

	def createByExt
		name = params[:name]
		val = params[:valor]
		grd = params[:grado]
		array1 = "ARRAY["
		array2 = "ARRAY["

		connection = ActiveRecord::Base.connection()

		val.each do |p|
			if not p.blank?
				array1 = array1 + "#{p},"
			end
		end

		1.times do array1.chop! end

		array1 = array1 + "]"

		grd.each do |p|
			if not p.blank?
				array2 = array2 + "#{p},"
			end
		end

		1.times do array2.chop! end

		array2 = array2 + "]"

		q1 = "INSERT INTO information_schema_fuzzy.constants2 
		(constant_schema, domain_name, constant_name, value, fuzzy_type) 
		VALUES ('NULL', 'fuzzyint','#{name}-#{session[:ident]}',ROW(#{array2},
		#{array1}, '1'), 'NULL')" 
	
		puts q1
		q2 = "SELECT EXISTS 
		(SELECT 1 FROM information_schema_fuzzy.constants2 
			WHERE constant_name = '#{name}-#{session[:ident]}' AND domain_name = 'fuzzyint' 
			AND constant_schema = 'public' LIMIT 1)"
		q3 = "SELECT EXISTS 
		(SELECT 1 FROM information_schema_fuzzy.domains2 WHERE domain_name = 'fuzzyint' LIMIT 1);"
		q4 = "UPDATE information_schema_fuzzy.constants2 
		SET constant_schema = 'public', fuzzy_type = 'fuzzyextension' 
		WHERE constant_schema = 'NULL'"

		begin
			puts '0'
			connection.execute(q1)
			puts "hizo1"
			connection.execute(q2)
			puts '2'
			connection.execute(q3)
			puts '3'
			connection.execute(q4)
			puts '4'
		rescue
		end
	end

	def listarConst
		connection = ActiveRecord::Base.connection()
		q1 = "select constant_name, value from information_schema_fuzzy.constants2 
		where constant_name like '%#{session[:ident]}'"
		@@consts = connection.execute(q1)

		respond_to do |format|
			flash[:constantsQ] = 'complete'
			format.html { redirect_to :action => :constants }
		end
	end

end
