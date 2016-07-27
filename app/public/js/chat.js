var socket = null

var Chat = function (host, id) {

    /**
     * Server address.
     * @type String
     */
    var _host = host

    /**
     * User id.
     * @type int
     */
    var _id = id

    /**
     * Start the chat application.
     */
    this.initialize = function () {
        connect()
        registerSocketEvents()
        registerDOMEvents()
    }

    /**
     * Connect to server.
     */
    var connect = function () {
        socket = io(_host, {
            query: 'id=' + _id
        })
    }

    /**
     * Register dom events.
     */
    var registerDOMEvents = function () {
        var $form = $('#chat-form')
        $form.submit(function (e) {
            e.preventDefault()

            var msg = $('#m').val().trim()

            sendMessage(msg)
            
            addMessage('Me', msg, true)
            
            this.reset()
        })
    }

    /**
     * Register socket event.
     */
    var registerSocketEvents = function () {
        socket.on('message', onMessageReceived)
        socket.on('user-leave', onUserLeaves)
    }

    /**
     * Send message to server.
     * @param {String} msg
     */
    var sendMessage = function (msg) {
        socket.emit('message', {
            message: msg
        })
    }

    /**
     * Add message to DOM.
     * @param {String} author Of the message
     * @param {String} msg Content.
     * @param {Boolean} local TRUE if the user is local or false otherwise.
     */
    var addMessage = function (author, msg, local) {
        var className = 'bs-callout bs-callout-'
        if (local) {
            className += 'default'
        } else {
            className += 'primary'
        }

        var $li = $('<li>', {'class': className})
            .append($('<strong>'), {
                text: author
            })
            .append($('<span>', {
                text: msg
            }))
            .appendTo('#messages')
        
        $li.goTo()
    }

    /**
     * Function called when the server send a message.
     * @param {String} data Received from server.
     */
    var onMessageReceived = function (data) {
        addMessage(data.author || 'Unknown', data.message, false)
    }

    /**
     * Function called when users disconnect.
     * @param {Object} data 
     */
    var onUserLeaves = function (data) {
        console.log(data)
    }
}
