
import React from 'react';
import Todo from './todo';

var workItems = [
	{id : 0, text : 'Plan sprint 4 of SDM', complete : false},
	{id : 1, text : 'Refactor SDM\\Service\\Search', complete : true},
	{id : 2, text : 'Present new thing to John', complete : false},
];

var personalItems = [
	{id : 3, text : 'Take the dog for a walk', complete : false},
	{id : 4, text : 'Clean the kitchen', complete : true},
	{id : 5, text : 'Watch TV', complete : false},
];

React.render(
	(<div>
		<h1>Simons Lists</h1>
		<Todo name="Work List" defaults={workItems} />,
		<Todo name="Personal List" defaults={personalItems} />,
	</div>),
	document.getElementById('app')
);
