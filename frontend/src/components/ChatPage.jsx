import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useGetChannels } from '../services/channelsApi';
import { useGetMessages } from '../services/messagesApi';
import ChannelsBox from './ChannelsBox';
import ChatBox from './ChatBox';

const ChatPage = () => {
  const { isLoading: isChannlesLoading } = useGetChannels(undefined);
  const { isLoading: isMessagesLoading } = useGetMessages();

  return isChannlesLoading || isMessagesLoading
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Загрузка</span>
        </Spinner>
      </div>
    )
    : (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    );
};

export default ChatPage;
