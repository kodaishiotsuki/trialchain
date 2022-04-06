import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

export default function UnauthModal({ history, setModalOpen }) {
  const [open, setOpen] = useState(true);
  const { prevLocation } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //モーダル閉じる
  function handleClose() {
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    //現在の画面を保持する
    if (history && prevLocation) {
      history.push(prevLocation.pathname); //今の画面へ遷移（空白にならない）
    } else {
      history.push("/events");
    }
    setOpen(false);
  }

  //ログイン、新規登録入力後にモーダル非表示
  function handleOpenLoginModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    setModalOpen(false);
  }

  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='You need to be signed in to do that' />
      <Modal.Content>
        <p>Please either login or register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
            onClose={handleOpenLoginModal}
          />
          <Button.Or />
          <Button
            fluid
            color='green'
            content='Register'
            onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
            onClose={handleOpenLoginModal}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: "center" }}>
          <p>Or Click cancel to continue as a guest</p>
          <Button onClick={handleClose} content='Cancel' />
        </div>
      </Modal.Content>
    </Modal>
  );
}
