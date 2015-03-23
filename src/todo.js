
import clone from 'lodash/lang/clone';
import React from 'react';

export default React.createClass({
	getInitialState: function() {
		return {
			items: this.props.defaults
		};
	},
	submitHandler : function(event) {
		event.preventDefault();
		var input = this.getRef('newItem');
		var item = this.createItem(input.value.trim());
		this.addItem(item);
		input.value = '';
	},
	createItem : function(name) {
		return {
			id : Date.now(),
			text : name
		}
	},
	addItem : function(newItem) {
		var state = this.state;
		state.items.push(newItem);
		this.setState(state);
	},
	getRef : function(ref) {
		return React.findDOMNode(this.refs[ref]);
	},
	render: function() {

		var renderItems = this.state.items.map(function (item) {

			var style = {
				textDecoration : 'strikethrough'
			};

			return (
				<li key={item.id} style={style}>
					{item.text}
				</li>
			);
		});

		return (
			<form className="todo" onSubmit={this.submitHandler} >
				<h3>{this.props.name}</h3>
				<ul>
					{renderItems}
				</ul>
				<input type="text" ref="newItem" />
			</form>
		);
	}
});

