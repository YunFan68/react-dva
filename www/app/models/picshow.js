import React from "react";
import R from "ramda";

export default {
	namespace : "picshow" ,
	state : {
		car : "Haval",
		data : {} ,
		nowalbum : "view",
		nowcolor : "",
		nowpicidx : 0 		//在当前图集中的图片编号
	},
	reducers : {
		init(state , {payload}){
			return {
				...state , 
				car : payload.car,
				data : payload.result,
				nowcolor : Object.keys(payload.result)[0]	//让0号颜色成为默认颜色
			}
		},
		changealbum(state , {payload}){
			return {
				...state ,
				nowalbum : payload.album ,
				nowpicidx : 0
			}
		},
		changecolor(state , {payload}){
			return {
				...state,
				nowalbum : "view" ,
				nowcolor : payload.color,
				nowpicidx : 0
			}
		},
		changejpicidx(state , {payload}){
			return {
				...state,
				nowpicidx : payload.idx
			}
		},
		gonext(state , {payload}){
			var albumarr = [];
			state.data[state.nowcolor].hasOwnProperty("view") &&  albumarr.push("view");
			state.data[state.nowcolor].hasOwnProperty("center") &&   albumarr.push("center");
			state.data[state.nowcolor].hasOwnProperty("detail") &&  albumarr.push("detail");

			const coloramount = Object.keys(state.data).length //颜色总数
			const nowcoloridx = Object.keys(state.data).indexOf(state.nowcolor);
			
			const albumamount = Object.keys(state.data[state.nowcolor]).length;
			const nowalbumaidx = albumarr.indexOf(state.nowalbum);

			const picamount = state.data[state.nowcolor][state.nowalbum].length;
			const picidx = state.nowpicidx;
			 	
			//到图集末尾了
 			if(picidx + 1 == picamount){
 				//到所有图集末尾了
 				if(nowalbumaidx + 1 == albumamount){
 					if(nowcoloridx + 1 == coloramount){
 						alert("已经到末尾了！现在开始从头观看！");
 						return {
							...state , 
							nowpicidx : 0 ,
							nowalbum : "view",
							nowcolor : Object.keys(state.data)[0]	//让0号颜色成为默认颜色
						}

 					}

 					return {
 						...state,
 						nowpicidx : 0 ,
 						nowalbum : "view",
 						nowcolor : Object.keys(state.data)[nowcoloridx + 1]
 					}
 				}
 				
 				return {
 					...state,
 					nowpicidx : 0 ,
 					nowalbum : albumarr[nowalbumaidx + 1]
 				}
 			}

 			return{
 				...state,
 				nowpicidx : state.nowpicidx + 1
 			}
		},
		goprev(state , {payload}){
			return state;
		}
	},
	effects : {
		//拉取默认数据
		fetchinit : function* (action , {put}){
			const {result} = yield fetch(`/car/${action.car}`).then(res=>res.json());
			yield put({"type" : "init" , payload : {result , car : action.car}});
		}
	}
}