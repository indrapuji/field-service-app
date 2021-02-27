import HostUrl from './HostUrl';
import Swal from 'sweetalert2';
import newAlert from './NewAlert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const VerifyAlert = ({ text, url, msgTrue, passTo }) => {
  const history = useHistory();
  return Swal.fire({
    title: 'Are You Sure?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios({
          method: 'DELETE',
          url: HostUrl + '/' + url,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        newAlert({ status: 'success', message: msgTrue });
        history.push(passTo);
      } catch (error) {
        const { msg } = error.response.data;
        newAlert({ status: 'error', message: msg });
        console.log(error.response.data);
      }
    } else {
      newAlert({ status: 'error', message: 'Cancel' });
    }
  });
};

export default VerifyAlert;
