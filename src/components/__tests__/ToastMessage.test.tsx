import { toast } from 'react-toastify';
import { toastMessage } from 'components/ToastMessage';
import { ToastType } from 'utils/constants';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
  Bounce: () => null,
}));

describe('toastMessage function', () => {
  it('should call toast.success with the correct parameters', () => {
    const message = 'Success message';
    toastMessage(message, ToastType.SUCCESS);

    expect(toast.success).toHaveBeenCalledWith(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: expect.any(Function),
    });
  });
});
