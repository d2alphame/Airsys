#!/usr/bin/perl

use v5.26;
use DBI;

# Number of random flights to fill the database with initially. For demo
# purposes only.
my $flightCount = 1000;

# Fill the flights table with some random flights
my %cities_airports = (
	Abuja				=>		"Nnamdi Azikiwe International Airport",
	Enugu				=>		"Akanu Ibiam International Airport",
	Ilorin				=>		"Ilorin International Airport",
	Kaduna				=>		"Kaduna International Airport",
	Kano				=>		"Mallam Aminu Kano International Airport",
	Lagos				=>		"Murtala Muhammed International Airport",
	"Port Harcourt"		=>		"Port Harcourt International Airport",
	Sokoto				=>		"Sadiq Abubakar III International Airport",
	Asaba				=>		"Asaba International Airport",
	Bauchi				=>		"Sir Abubakar Tafawa Balewa Airport",
	Benin				=>		"Benin Airport",
	Calabar				=>		"Margaret Ekpo International Airport",
	Ibadan				=>		"Ibadan Airport",
	Jos					=>		"Yakubu Gowon Airport",
	Maiduguri			=>		"Maiduguri International Airport",
	Owerri				=>		"Sam Mbakwe International Cargo Airport",
	Uyo					=>		"Akwa Ibom International Airport",
	Yola				=>		"Yola Airport",
	Akure				=>		"Akure Airport",
	Bauchi				=>		"Bauchi State Airport",
	Gombe				=>		"Gombe Lawanti International Airport",
	"Birnin Kebbi"		=>		"Kebbi International Airport",
	Dutse				=>		"Dutse International Airport",
	Jalingo				=>		"Jalingo Airport",
	Katsina				=>		"Katsina Airport",
	Makurdi				=>		"Makurdi Airport",
	Minna				=>		"Minna Airport",
	Warri				=>		"Warri Airport",
	Yenagoa				=>		"Bayelsa International Airport",
	Zaria				=>		"Zaria Airport"
);
my @cities = keys %cities_airports;
my @terminals = ('A' .. 'Z');
my @dates;								# An array of random dates for sample flights

# Connect to the flights.db database
my $db = DBI -> connect("dbi:SQLite:dbname=flights.db", "", "", {AutoCommit => 0});

# Prepare the 'prepare statement'
my $prep = $db -> prepare(<<"END-SQL");
insert into flights
(flight_number, takeoff, takeoff_city, takeoff_airport, takeoff_terminal, destination_city, flight_duration)
values(?, ?, ?, ?, ?, ?, ?)
END-SQL


# Insert random flights into the flights table. For demo purposes only
for(1 .. $flightCount) {

	my $date = getRandomDateTime();							# Generate a random take off date
	my $takeoff_city = $cities[rand @cities];				# Choose a takeoff city at random
	my $destination_city = $cities[rand @cities];			# Choose a destination city at random
	my $takeoff_airport = $cities_airports{$takeoff_city};	# Choose a random takeoff airport based on takeoff city
	my $terminal = $terminals[rand @terminals];				# Choose a random terminal

	$prep -> execute($_, $date, $takeoff_city, $takeoff_airport, $terminal, $destination_city, (rand(12)));
}

$db -> commit;


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


	#sprintf "2021-$month-$day $hour:$minute:$second", $month, $day, $hour, $minute, $second;
	sprintf "2021-%02d-%02dT%02d:%02d:%02d", $month, $day, $hour, $minute, $second;
}


sub getRandomDate {

}

sub getRandomTime {
	my $hour = int(rand(24));
	my $minute = int(rand(60));
	sprintf "%02:%02", $hour, $minute;
}