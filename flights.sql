create table if not exists flights (
	flight_id integer primary key,
	flight_number integer not null,
	takeoff_date datetime not null,
	takeoff_time datetime not null,
	takeoff_city varchar(128) not null,
	takeoff_airport varchar(128) not null,
	takeoff_terminal varchar(16) not null,
	destination_city varchar(128) not null,
	flight_duration tinyint not null,
	next_row tinyint not null,
	next_col tinyint not null,
	max_rows tinyint not null,
	seats_left tinyint not null
);

create table if not exists bookings (
	booking_id integer primary key,
	flight_id integer not null,
	booking_number integer not null,
	flight_number integer not null,
	seat_number char(4) not null,
	first_name varchar(32) not null,
	last_name varchar(32) not null,
	middle_name varchar(32) not null,
	email varchar(128) not null,
	phone char(32),
	FOREIGN KEY(flight_id) REFERENCES flights(flight_id)
);