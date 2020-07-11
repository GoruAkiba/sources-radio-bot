/* eslint-disable no-undef */
const express = require("express");
const app = express();


const _PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/",(req,resp) => {
	return resp.json({
		status:"ok"
	});
})

app.listen(_PORT, ()=>{
	console.log(`Listening to port : ${_PORT}`);
})