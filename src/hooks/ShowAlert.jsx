import Swal from 'sweetalert2';

const showAlert = async (type, message = '', position = 'top-end') => {
  if (type === 15) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
      padding: '10px 20px',
    });
  }
};

const appAlert = () => {};

export default appAlert;
