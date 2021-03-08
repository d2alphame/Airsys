#!/usr/bin/perl

use v5.26;
use DBI;

# Connect to the database
my $db = DBI -> connect("dbi:SQLite:dbname=hostels.db", "", "");
my $prep = $db -> prepare(<<"END-SQL");
insert into flights
(flight_number, takeoff, takeoff_city, takeoff_airport, takeoff_terminal, destination_city, flight_duration)
values(?, ?, ?, ?, ?, ?, ?)
END-SQL


# Number of random flights to fill the database with initially. For demo
# purposes only.
my $flightCount = 1000;

# Fill the flights table with some random flights
my @cities = (
	"Abuja",
	"Enugu",
	"Ilorin",
	"Kaduna",
	"Kano",
	"Lagos",
	"Port Harcourt",
	"Sokoto",
	"Asaba",
	"Bauchi",
	"Benin",
	"Calabar",
	"Ibadan",
	"Jos",
	"Maiduguri",
	"Owerri",
	"Uyo",
	"Yola",
	"Akure",
	"Bauch",
	"Gombe",
	"Birnin Kebbi",
	"Dutse",
	"Jalingo",
	"Katsina",
	"Makurdi",
	"Minna",
	"Warri",
	"Yenagoa",
	"Zaria"
);
my @dates;								# An array of random dates for sample flights

# Connect to the flights.db database
my $db = DBI -> connect("dbi:SQLite:dbname=flights.db", "", "");

# Insert random flights into the flights table. For demo purposes only
for(1 .. $flightCount) {

	my $date = getRandomDateTime();						# Generate a random take off date
	my $takeoff_city = $cities[rand @cities];			# Choose a takeoff city at random
	my $destination_city = $cities[rand @cities];		# Choose a destination city at random
}

# Returns a random date.
sub getRandomDateTime {

	my $month = int(rand(12)) + 1;			# Generate a random month
	my $day;								# For a random date
	if(		$month == 1		||
			$month == 3		||
			$month == 5		||
			$month == 7		||
			$month == 8		||
			$month == 10	||
			$month == 12	)
	{
		$day = int(rand(31)) + 1;
	}
	elsif(	$month == 4		||
			$month == 6		||
			$month == 9		||
			$month == 11	)
	{
		$day = int(rand(30)) + 1;
	}
	elsif(	$month == 2	) {
		$day = int(rand(28)) + 1;
	}

	my $hour = int(rand(24));
	my $minute = int(rand(60));
	my $second = int(rand(60));

	#sprintf "2021-$month-$day $hour:$minute:$second", $month, $day, $hour, $minute, $second;
	sprintf "2021-%02d-%02dT%02d:%02d:%02d", $month, $day, $hour, $minute, $second;
}