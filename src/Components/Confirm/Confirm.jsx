import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

const Confirm = ({ text, yes }) => {
  const confirm = () => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to perform this action?',
      buttons: [
        { label: 'Yes', onClick: () => yes() },
        { label: 'No' }
      ]
    });
  };

  return (
    <button
      className="btn btn-danger"
      onClick={e => confirm()}
    >
      {text}
    </button>
  )
}

export default Confirm;
