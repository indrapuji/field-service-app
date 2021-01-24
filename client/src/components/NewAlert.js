import Swal from 'sweetalert2';

const NewAlert = (props) => {
  const { status, message } = props;
  return Swal.fire({
    icon: `${status}`,
    title: `${message}`,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default NewAlert;
