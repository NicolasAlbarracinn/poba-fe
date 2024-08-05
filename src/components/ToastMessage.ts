import { Bounce, toast } from 'react-toastify';
import { ToastType } from 'utils/constants';

type ToastTypes =
  | ToastType.SUCCESS
  | ToastType.ERROR
  | ToastType.INFO
  | ToastType.WARN;

export const toastMessage = (
  message: string,
  type: ToastTypes = ToastType.SUCCESS,
) =>
  toast[type](message, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  });
