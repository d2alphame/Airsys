#! /bin/bash
# Script to automatically setup the flights database

# Install sqlite3
sudo apt install sqlite3

# Install DBI Perl module
sudo apt install libdbi-perl

# Select the flightsdb database (or create it if it doesn't exist) and run the sql queries in flights.sql
sqlite3 flights.db < flights.sql
./setupdb.pl