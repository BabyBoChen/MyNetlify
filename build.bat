go env -w GOOS=js GOARCH=wasm
go build -o D:\GitHub\MyNetlify\ransom.wasm
go env -w GOOS=windows GOARCH=amd64