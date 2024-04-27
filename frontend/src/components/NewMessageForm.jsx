import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const NewMessageForm = () => {
  console.log('');
  return (
    <Form noValidate className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          name="body"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">отправить</span>
        </Button>
      </InputGroup>
    </Form>

  );
};

export default NewMessageForm;
