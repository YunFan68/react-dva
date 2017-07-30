import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js";

class CountryFilter extends React.Component{
	constructor({props}){
		super(props);

 		this.state = {
 			//a标签的数组（国家的名字）
 			"countries" : Object.keys(brands)
 		};
	}

	showcountrylist(){
		return this.state.countries.map((item,index)=>{
			return <a key={index} onClick={()=>{this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "country" , "tagvalue" : item}})}}>{item}</a>
		});
	}
		
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						国家：
					</div>
					<div className="col-xs-11">
						{this.showcountrylist()}
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => {
		return {

		}
	}
)(CountryFilter);