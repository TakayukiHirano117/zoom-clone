import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '../auth/current-user.state';
import { useEffect } from 'react';

export interface Participant {
  id: string;
  name: string;
  stream: MediaStream | null;
}

export const useMeeting = () => {
  const [localStreams, setLocalStreams] = useState<MediaStream[]>([]);
  const currentUser = useAtomValue(currentUserAtom);
  const [me, setMe] = useState<Participant>({
    id: currentUser!.id,
    name: currentUser!.name,
    stream: null,
  });

  useEffect(() => {
    setMe((prev) => ({
      ...prev,
      stream: localStreams[0],
    }));
  }, [localStreams]);

  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStreams((prev) => [...prev, stream]);
  };

  return { me, getStream };
};
