import React, { useEffect, useState } from 'react';
import _ from 'lodash';
// import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
import axios from 'axios';
import Messages from './Messages';

RealtimeMessages.propTypes = {
  jwt: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

function RealtimeMessages({ jwt, username, room }) {
  const [socket, setSocket] = useState(null);
  const [realdata, setRealdata] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    try {
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
    } catch (err) {
      console.log(err);
      return () => null;
    }
  }, [jwt, username, room]);

  useEffect(() => {
    const fetchData = async () => {
      const url = process.env.REACT_APP_REALTIME_SERVICE || 'http://localhost:1337/api/realtime';
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return result;
    };
    fetchData()
      .then((result) => {
        if (!result) throw new 'No result'();
        if (result.status !== 200) throw new Error('Error while fetching realtime data');
        // {
        //   id: '1669758309249-CRWD',
        //   sortid: 1669758309249,
        //   username: 'user-03491190118674845',
        //   value: '{"datatype":"VSA","symbol":"CRWD","timeframe":"15M…ice":112.7,"patterns":["macd"],"pattern":" macd"}',
        //   time: '11/29/2022, 9:45:09 PM'
        // }
        let counter = 0;
        const transformed = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const data of result.data.data) {
          // eslint-disable-next-line no-plusplus
          ++counter;
          const value = JSON.stringify({
            datatype: data.attributes.datatype,
            symbol: data.attributes.symbol,
            timeframe: data.attributes.timeframe,
            price: data.attributes.data.price,
            pattern: _.join(data.attributes.data.patterns, ',')
          });
          transformed.push({
            id: data.id,
            sortid: counter,
            username: '-',
            value,
            time: new Date(data.attributes.createdAt).toLocaleTimeString()
          });
        }
        setRealdata(transformed);
        setIsFetched(true);
      })
      .catch((err) => {
        setRealdata([]);
        setIsFetched(true);
        console.log(err);
      });
  }, [jwt]);

  if (socket && isFetched) return <Messages socket={socket} initMessages={realdata} />;
  return <div>Not connected</div>;
}

export default RealtimeMessages;
