// Socket.io events for changefeed
// socket-events.js

module.exports = function (socket, entityName) {
  return function (rows) {
    // console.log(['emit events for changes to todos rows ', rows]);

    rows.each(function (err, row) {
      // console.log(['emit events for changes to todo', row]);
      if (err) {
        return console.log(err);
      }
      else if (row.new_val && !row.old_val) {
        console.log(['socket.emit', entityName + ":insert"]);
        socket.emit(entityName + ":insert", row.new_val);
      }
      else if (row.new_val && row.old_val) {
        console.log(['socket.emit', entityName + ":update"]);
        socket.emit(entityName + ":update", row.new_val);
      }
      else if (row.old_val && !row.new_val) {
        console.log(['socket.emit', entityName + ":delete"]);
        socket.emit(entityName + ":delete", {id: row.old_val.id});
      }
    });
  };
};
