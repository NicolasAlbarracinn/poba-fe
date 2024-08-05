export const thumbnailWrapperStyles = card => ({
  position: 'relative',
  width: { xs: 81.67, md: 122.5 },
  height: { xs: 114, md: 171 },
  '&:hover .close-button': {
    display: card.id === '' ? 'none' : 'flex',
  },
});

export const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const closeButtonStyles = {
  display: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  justifyContent: 'center',
  alignItems: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  cursor: 'pointer',
};
