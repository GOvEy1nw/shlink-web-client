import { faFileDownload as exportIcon, faPlus as plusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import { Result, SearchField, SimpleCard } from '../../shlink-frontend-kit/src';
import { NoMenuLayout } from '../common/NoMenuLayout';
import type { TimeoutToggle } from '../utils/helpers/hooks';
import type { ServersMap } from './data';
import type { ImportServersBtnProps } from './helpers/ImportServersBtn';
import type { ManageServersRowProps } from './ManageServersRow';
import type { ServersExporter } from './services/ServersExporter';

interface ManageServersProps {
  servers: ServersMap;
}

const SHOW_IMPORT_MSG_TIME = 4000;

export const ManageServers = (
  serversExporter: ServersExporter,
  ImportServersBtn: FC<ImportServersBtnProps>,
  useTimeoutToggle: TimeoutToggle,
  ManageServersRow: FC<ManageServersRowProps>,
): FC<ManageServersProps> => ({ servers }) => {
  const allServers = Object.values(servers);
  const [serversList, setServersList] = useState(allServers);
  const filterServers = (searchTerm: string) => setServersList(
    allServers.filter(({ name, url }) => `${name} ${url}`.toLowerCase().match(searchTerm.toLowerCase())),
  );
  const hasAutoConnect = serversList.some(({ autoConnect }) => !!autoConnect);
  const [errorImporting, setErrorImporting] = useTimeoutToggle(false, SHOW_IMPORT_MSG_TIME);

  useEffect(() => {
    setServersList(Object.values(servers));
  }, [servers]);

  return (
    <NoMenuLayout>
      <SearchField className="mb-3" onChange={filterServers} />

      <Row className="mb-3">
        <div className="col-md-6 d-flex d-md-block mb-2 mb-md-0">
          <ImportServersBtn className="flex-fill" onImportError={setErrorImporting}>Import servers</ImportServersBtn>
          {allServers.length > 0 && (
            <Button outline className="ms-2 flex-fill" onClick={async () => serversExporter.exportServers()}>
              <FontAwesomeIcon icon={exportIcon} fixedWidth /> Export servers
            </Button>
          )}
        </div>
        <div className="col-md-6 text-md-end d-flex d-md-block">
          <Button outline color="primary" className="flex-fill" tag={Link} to="/server/create">
            <FontAwesomeIcon icon={plusIcon} fixedWidth /> Add a server
          </Button>
        </div>
      </Row>

      <SimpleCard>
        <table className="table table-hover responsive-table mb-0">
          <thead className="responsive-table__header">
            <tr>
              {hasAutoConnect && <th aria-label="Auto-connect" style={{ width: '50px' }} />}
              <th>Name</th>
              <th>Base URL</th>
              <th aria-label="Options" />
            </tr>
          </thead>
          <tbody>
            {!serversList.length && <tr className="text-center"><td colSpan={4}>No servers found.</td></tr>}
            {serversList.map((server) => (
              <ManageServersRow key={server.id} server={server} hasAutoConnect={hasAutoConnect} />
            ))}
          </tbody>
        </table>
      </SimpleCard>

      {errorImporting && (
        <div className="mt-3">
          <Result type="error">The servers could not be imported. Make sure the format is correct.</Result>
        </div>
      )}
    </NoMenuLayout>
  );
};
