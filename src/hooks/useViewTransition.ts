import { useNavigate } from 'react-router-dom';

interface UseViewTransitionReturn {
  navigateWithTransition: (path: string, viewTransitionName?: string) => void;
}

export const useViewTransition = (): UseViewTransitionReturn => {
  const navigate = useNavigate();

  const navigateWithTransition = (path: string, _viewTransitionName?: string): void => {
    if (!('startViewTransition' in document)) {
      navigate(path);
      return;
    }
    (document as Document & { startViewTransition: (cb: () => void) => void })
      .startViewTransition(() => {
        navigate(path);
      });
  };

  return { navigateWithTransition };
};
