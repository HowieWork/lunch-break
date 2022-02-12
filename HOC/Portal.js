import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = (props) => {
  const [mounted, setMounted] = useState(false);

  // NOTE useEffect only runs on the client, so when mounted is true, it means that we are on the client.
  // Remember, that there is no "window" or "document" on the server, which is why you get an error

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        props.children,
        document.getElementById('notifications')
      )
    : null;
};

export default Portal;
