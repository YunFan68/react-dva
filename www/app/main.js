import React from "react";
import dva, { connect } from 'dva';
import createLogger from 'dva-logger';
import createLoading from 'dva-loading';
import router from "./router.js";
import carsearch from "./models/carsearch.js";
import picshow from "./models/picshow.js";

//创建app
const app = dva();

//使用插件
app.use(createLogger());
// app.use(createLoading({effects: true , loading :{global: true}}));

//使用model
app.model(carsearch);
app.model(picshow);

//路由
app.router(router);

//启动
app.start("#root");