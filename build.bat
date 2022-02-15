set ROOT=%cd%
go env -w GOOS=js GOARCH=wasm
go build -o %ROOT%\goWASM.wasm %ROOT%
go env -w GOOS=windows GOARCH=amd64