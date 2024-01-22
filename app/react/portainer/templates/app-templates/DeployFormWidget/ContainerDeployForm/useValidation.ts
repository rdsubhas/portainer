import { object, string } from 'yup';
import { useMemo } from 'react';

import { accessControlFormValidation } from '@/react/portainer/access-control/AccessControlForm';
import { hostnameSchema } from '@/react/docker/containers/CreateView/NetworkTab/HostnameField';
import { hostFileSchema } from '@/react/docker/containers/CreateView/NetworkTab/HostsFileEntries';
import { labelsTabUtils } from '@/react/docker/containers/CreateView/LabelsTab';
import { nameValidation } from '@/react/docker/containers/CreateView/BaseForm/NameField';
import { validationSchema as portSchema } from '@/react/docker/containers/CreateView/BaseForm/PortsMappingField.validation';
import { volumesTabUtils } from '@/react/docker/containers/CreateView/VolumesTab';

import { envVarsFieldsetValidation } from '../EnvVarsFieldset';

export function useValidation(isAdmin: boolean) {
  return useMemo(
    () =>
      object({
        accessControl: accessControlFormValidation(isAdmin),
        envVars: envVarsFieldsetValidation(),
        hostname: hostnameSchema,
        hosts: hostFileSchema,
        labels: labelsTabUtils.validation(),
        name: nameValidation(),
        network: string().default(''),
        ports: portSchema(),
        volumes: volumesTabUtils.validation(),
      }),
    [isAdmin]
  );
}
