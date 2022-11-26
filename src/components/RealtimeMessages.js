import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import Messages from './Messages';

RealtimeMessages.propTypes = {
  jwt: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

function RealtimeMessages({ jwt, username, room }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
    const newSocket = socketIOClient(url, {
      query: {
        token: jwt
      }
    });
    // const newSocket = io(`http://localhost:1337`);
    newSocket.emit('joinRoom', { username, room });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [jwt, username, room]);

  if (socket) return <Messages socket={socket} />;
  return <div>Not connected</div>;
}

export default RealtimeMessages;
