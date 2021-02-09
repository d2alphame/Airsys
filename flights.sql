create table flights (
	flight_id integer primary key,
	flight_number integer not null
	takeoff_date date not null,
	takeoff_time time not null,
	takeoff_city varchar(128) not null,
	takeoff_airport varchar(128) not null,
	takeoff_terminal varchar(16) not null,
	destination_city varchar(128) not null,
	flight_duration tinyint not null
);