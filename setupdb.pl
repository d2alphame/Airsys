#!/usr/bin/perl

use v5.26;
use DBI;

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