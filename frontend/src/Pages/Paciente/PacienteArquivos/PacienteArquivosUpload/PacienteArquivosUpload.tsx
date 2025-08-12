import { useRef } from 'react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import classes from './PacienteArquivosUpload.module.css';
import { MdCloudDownload, MdCloudUpload, MdError } from 'react-icons/md';

export function PacienteArquivosUpload() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={5 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <MdCloudDownload size={50} color={theme.colors.blue[6]} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <MdError size={50} color={theme.colors.red[6]} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <MdCloudUpload size={50} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Solte o arquivo aqui</Dropzone.Accept>
            <Dropzone.Reject>Arquivo não pode ser enviado</Dropzone.Reject>
            <Dropzone.Idle>Faça upload de documentos do paciente</Dropzone.Idle>
          </Text>

          <Text className={classes.description}>
            Arraste arquivos aqui para fazer upload. <br />
            Por enquanto aceitamos apenas arquivos PDF que <u>tenham no máximo 5Mb</u>.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}