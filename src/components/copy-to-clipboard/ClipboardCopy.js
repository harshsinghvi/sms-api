import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';

export const ClipboardCopy = ({ heading, copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      const res = await navigator.clipboard.writeText(text);
      return res;
    }
    return document.execCommand('copy', true, text);
  };

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        marginBottom: '10px',
        width: '100%',
      }}
    >
      <TextField
        id="filled-basic"
        label={heading}
        variant="filled"
        type="text"
        value={copyText}
        readOnly
        fullWidth
        onClick={handleCopyClick}
        // sx={{ width: 'auto' }}
      />
      <Button onClick={handleCopyClick} variant="outlined" size="large">
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </Button>
    </Box>
  );
};
