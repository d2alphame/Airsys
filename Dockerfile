FROM perl:5.26
RUN apt update && apt upgrade -y
RUN cpan install DBI
RUN cpan install DBD::SQLite
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs sqlite3 libsqlite3-dev
WORKDIR /app
COPY . .
RUN npm install
RUN ./setupdb.sh
ENTRYPOINT [ "npm", "run", "start" ]