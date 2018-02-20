# quotation-frontend

This is the frontend program of our QuotationManangement
Web API, which is built for our commercial use.

## Configuration
In `src/config/`, create two files: `DebugConfig.ts` and `ProdConfig.ts`, both of them should export a const variable named `config` of type `Config`.
See [this page][1] for an example.

## Development
Start webpack-dev-server with
```
npm start
```
Then access `http://localhost:9000/`

## Build
Issue a production build with
```
npm run build
```
The output files will be placed under `./build`. Configure the backend code to serve that folder as a static site.

[1]: https://github.com/JiaheSoft/quotation-frontend/wiki/Example-DebugConfig.ts