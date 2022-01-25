import React, { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectPrivateRecipient,
  selectPrivateRecipientNickname,
  privateRecipientSave,
  privateRecipientNicknameSave,
} from "../../../app/chatSlice";

const BottomPanel = ({ userSendMessage, sendMessageOnButton }) => {
  const dispatch = useAppDispatch();
  const privateRecipient = useAppSelector(selectPrivateRecipient);
  const privateRecipientNickname = useAppSelector(
    selectPrivateRecipientNickname
  );

  const messageInput = useRef();

  const handleSendMessageOnButton = () => {
    let message = messageInput.current.value;
    if (message === "") return;

    sendMessageOnButton(message);

    messageInput.current.value = "";
  };

  const privateModeOff = () => {
    dispatch(privateRecipientSave());
    dispatch(privateRecipientNicknameSave());
  };

  return (
    <div className="bottom-panel">
      {privateRecipient && privateRecipientNickname && (
        <div
          className="private-info"
          onClick={privateModeOff}
        >{`Лично для ${privateRecipientNickname}: `}</div>
      )}
      <input
        type="text"
        className="message-input"
        placeholder="Введите сообщение..."
        onKeyPress={userSendMessage}
        ref={messageInput}
      />
      <button
        className="button-sendmessage"
        onClick={handleSendMessageOnButton}
      >
        Отправить
      </button>
    </div>
  );
};

export default BottomPanel;
