#1/bin/bash

# Download sqlite
wget -O sqlite.tar.gz https://www.sqlite.org/2019/sqlite-autoconf-3300100.tar.gz

# Unzip
tar -xvzf sqlite.tar.gz
mv sqlite-autoconf-3300100/ sqlite/

# Build
cd sqlite
mkdir build
cd build
../configure
make -j4
sudo make install

# Delete sqlite files
cd ../../
rm -r sqlite/
rm sqlite.tar.gz

