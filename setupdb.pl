#!/usr/bin/perl

use v5.26;
use DBI;

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


# Connect to the flights.db database
my $db = DBI -> connect("dbi:SQLite:dbname=flights.db", "", "");

# Insert random flights into the flights table. For demo purposes only
for($flightCount) {
	
}

# Returns a random date.
sub getRandomDate {

}