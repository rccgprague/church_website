import { SetStateAction, createContext, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

export const ModalContext = createContext({
  isShow: false,
  header: null as React.ReactNode,
  body: null as React.ReactNode,
  footer: null as React.ReactNode,
  setHeader: (header: SetStateAction<React.ReactNode>) => {},
  setBody: (body: SetStateAction<React.ReactNode>) => {},
  setFooter: (footer: SetStateAction<React.ReactNode>) => {},
  setIsShow: (value: SetStateAction<boolean>) => {},
});

const ModalProviver = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false);
  const [header, setHeader] = useState<React.ReactNode>(null);
  const [body, setBody] = useState<React.ReactNode>(null);
  const [footer, setFooter] = useState<React.ReactNode>(null);

  const modalContext = useMemo(
    () => ({
      isShow,
      header,
      body,
      footer,
      setHeader,
      setBody,
      setFooter,
      setIsShow,
    }),
    [body, footer, header, isShow]
  );
  return (
    <ModalContext.Provider value={modalContext}>
      {isShow && (
        <Modal show={isShow} onHide={() => setIsShow(false)} size="xl" centered>
          <Modal.Header closeButton>{header && header}</Modal.Header>
          {body && <Modal.Body>{body}</Modal.Body>}
          {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProviver;
