import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useGetChannels } from '../services/channelsApi';
import { actions } from '../slices/index.js';

const Channel = ({ channel, isCurrent, handleChoose }) => {
  const variant = isCurrent ? 'secondary' : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      <Button
        type="button"
        key={channel.id}
        variant={variant}
        className="w-100 rounded-0 text-start"
        onClick={() => handleChoose(channel.id)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
};

const ChannelsBox = () => {
  const dispatch = useDispatch();

  const { data: channels } = useGetChannels();
  const currentChannelId = useSelector((state) => state.ui.currentChannelId);

  const handleChooseChannel = (channelId) => {
    dispatch(actions.setCurrentChannel({ channelId }));
  };

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isCurrent={channel.id === currentChannelId}
            handleChoose={handleChooseChannel}
          />
        ))}
      </ul>
    </>
  );
};

export default ChannelsBox;
