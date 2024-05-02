import React, { useRef, useEffect, useState } from 'react';
import {
  Modal as BootstrapModal,
  Form,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { actions } from '../slices/ui';
import {
  useAddChannel,
  useGetChannels,
  useUpdateChannel,
  useDeleteChannel,
} from '../services/channelsApi';

const getValidationSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('modals.required')
    .min(3, 'modals.min')
    .max(20, 'modals.max')
    .notOneOf(channels, 'modals.uniq'),
});
const AddChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannels(undefined);
  const channelNames = channels.map(({ name }) => name);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [
    addChannel,
    { error, isLoading }, // eslint-disable-line
  ] = useAddChannel();

  const f = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name }) => {
      const filteredName = leoProfanity.clean(name);
      const channel = { name: filteredName };
      getValidationSchema(channelNames).validateSync({ name: filteredName });
      addChannel(channel);
      toast.success(t('channels.created'));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.add')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              name="name"
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {t(f.errors.name) || t(f.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const RenameChannelForm = ({ handleClose }) => {
  const { data: channels } = useGetChannels(undefined);
  const channelNames = channels.map(({ name }) => name);
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.ui.modal.extra?.channelId);
  const channel = channels.find(({ id }) => channelId === id);
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  const [
    updateChannel,
    // TODO: доабавить обработку ошибок
    { error, isLoading }, // eslint-disable-line
  ] = useUpdateChannel();

  const f = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: getValidationSchema(channelNames),
    onSubmit: async ({ name }) => {
      const filteredName = leoProfanity.clean(name);
      const data = { name: filteredName, id: channelId };
      getValidationSchema(channelNames).validateSync({ name: filteredName });
      updateChannel(data);
      toast.success(t('channels.renamed'));
      handleClose();
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.rename')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              disabled={f.isSubmitting}
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              isInvalid={(f.errors.name && f.touched.name) || !!f.status}
              name="name"
              id="name"
            />
            <Form.Control.Feedback type="invalid">
              {t(f.errors.name) || t(f.status)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                variant="secondary"
                type="button"
                onClick={handleClose}
              >
                {t('modals.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={f.isSubmitting}
              >
                {t('modals.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </BootstrapModal.Body>
    </>
  );
};

const RemoveChannelForm = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    deleteChannel,
    // TODO: доабавить обработку ошибок
    { error, isLoading }, // eslint-disable-line
  ] = useDeleteChannel();
  const [loading, setLoading] = useState(false);

  const channelId = useSelector((state) => state.ui.modal.extra?.channelId);

  const handleRemove = () => {
    setLoading(true);
    deleteChannel(channelId);
    dispatch(actions.setCurrentChannel({ channelId: '1' }));
    toast.success(t('channels.removed'));
    handleClose();
  };

  return (
    <>
      <BootstrapModal.Header>
        <BootstrapModal.Title>{t('modals.remove')}</BootstrapModal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={loading}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </BootstrapModal.Body>
    </>
  );
};

const mapping = {
  addChannel: AddChannelForm,
  renameChannel: RenameChannelForm,
  removeChannel: RemoveChannelForm,
};

const Modal = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.ui.modal.isOpened);
  const modalType = useSelector((state) => state.ui.modal.type);

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  const Component = mapping[modalType];

  return (
    <BootstrapModal show={isOpened}>
      {Component && <Component handleClose={handleClose} />}
    </BootstrapModal>
  );
};

export default Modal;
