#! /bin/bash
# Script to automatically setup the flights database

# Select the flightsdb database (or create it if it doesn't exist) and run the sql queries in flights.sql
sqlite3 flights.db < flights.sql