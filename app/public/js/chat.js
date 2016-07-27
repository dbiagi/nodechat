var Chat = function(host, id){
	var socket = io(host, {
		query: 'id=' + id
	})

	socket.on('message', function(data){
		console.log(data)
	})
}
