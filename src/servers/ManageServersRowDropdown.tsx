import { faCircle as toggleOnIcon } from '@fortawesome/free-regular-svg-icons';
import {
  faBan as toggleOffIcon,
  faEdit as editIcon,
  faMinusCircle as deleteIcon,
  faPlug as connectIcon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import { RowDropdownBtn, useToggle } from '../../shlink-frontend-kit/src';
import type { ServerWithId } from './data';
import type { DeleteServerModalProps } from './DeleteServerModal';

export interface ManageServersRowDropdownProps {
  server: ServerWithId;
}

interface ManageServersRowDropdownConnectProps extends ManageServersRowDropdownProps {
  setAutoConnect: (server: ServerWithId, autoConnect: boolean) => void;
}

export const ManageServersRowDropdown = (
  DeleteServerModal: FC<DeleteServerModalProps>,
): FC<ManageServersRowDropdownConnectProps> => ({ server, setAutoConnect }) => {
  const [isModalOpen,, showModal, hideModal] = useToggle();
  const serverUrl = `/server/${server.id}`;
  const { autoConnect: isAutoConnect } = server;
  const autoConnectIcon = isAutoConnect ? toggleOffIcon : toggleOnIcon;

  return (
    <RowDropdownBtn minWidth={170}>
      <DropdownItem tag={Link} to={serverUrl}>
        <FontAwesomeIcon icon={connectIcon} fixedWidth /> Connect
      </DropdownItem>
      <DropdownItem tag={Link} to={`${serverUrl}/edit`}>
        <FontAwesomeIcon icon={editIcon} fixedWidth /> Edit server
      </DropdownItem>
      <DropdownItem onClick={() => setAutoConnect(server, !isAutoConnect)}>
        <FontAwesomeIcon icon={autoConnectIcon} fixedWidth /> {isAutoConnect ? 'Do not a' : 'A'}uto-connect
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem className="dropdown-item--danger" onClick={showModal}>
        <FontAwesomeIcon icon={deleteIcon} fixedWidth /> Remove server
      </DropdownItem>

      <DeleteServerModal redirectHome={false} server={server} isOpen={isModalOpen} toggle={hideModal} />
    </RowDropdownBtn>
  );
};
