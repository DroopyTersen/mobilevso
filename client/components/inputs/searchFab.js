import React from 'react';
import { debounce } from 'lodash'

require("./searchFab.css")
export default class SearchFab extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChange() {
		if (this.props && this.props.handleChange) {
			this.props.handleChange($("#search").val())
		}
	}

	//allow select all on focus
	bindEvents()  {
		var self = this;
		$("#search").on("focus", function() {
			var $input = $(this);
			setTimeout(() => $input.select(), 25);
		});

		$("#search").on("change", this.handleChange);

		$('.fixed-action-btn.click-to-toggle a').on("click", function(e) {
			var $btn = $(this);
			if (!$btn.parent().hasClass("active")) {
				$btn.removeClass("has-value");
				$(".fab-child").show();
				setTimeout(() => $("#search").focus(), 25);
			} else {
				if ($("#search").val()) {
					$btn.addClass("has-value");
				}
				$(".fab-child").hide();
			}
		})
	}

	componentDidMount() {
		setTimeout(() => {
			this.bindEvents();
		}, 1)
	}

	render() {
		var styles = {
			"bottom": "10px",
			"right": "10px"
		};

		return (
			<div className="fixed-action-btn horizontal click-to-toggle" style={styles}>
				<a id='search-btn' className="btn-floating btn-large red">
					<i className="large material-icons">search</i>
				</a>
				<ul>
					<li className='fab-child'> 
						<div className="floating-search z-depth-2">
          					<input id="search" type="search" name='search' onChange={debounce(this.handleChange.bind(this), this.props.delay)} />
        				</div>
					</li>
				</ul>
			</div>
		);
	}
}
