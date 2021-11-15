yarn install
yarn build
Run the following to update Grafana plugin SDK for Go dependency to the latest minor version:

go get -u github.com/grafana/grafana-plugin-sdk-go
go mod tidy
Build backend plugin binaries for Linux, Windows and Darwin to dist directory:

mage -v
