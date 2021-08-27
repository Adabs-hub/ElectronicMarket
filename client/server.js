

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');
//const { default: Server } = require('next/dist/next-server/server');
const { StrictMode } = require('react');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
    .then(() => {
        const server = express();

        //apply proxy in dev mode 
        if (dev) {
            server.use("/api",
                createProxyMiddleware({
                    target: "http://localhost:8008",
                    changeOrigin: true,

                }))

        }

        server.all("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log(">Ready on http://localhost:3000 ")
        });



    })
    .catch((err) => {
        console.log("Error ", err);
    });