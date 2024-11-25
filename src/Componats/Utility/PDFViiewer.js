import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const PDFViewer = ({ pdfOpen, setPdfOpen, fileTypeForView }) => {

    const [fileExtension, setFileExtension] = useState('')
    const handleClose = () => {
        setPdfOpen(false);
    };
    
    useEffect(() => {
        setFileExtension(getFileExtension(fileTypeForView));
    }, [fileTypeForView]);

    const getFileExtension = (fileType) => {
        const segments = fileType.split('.');
        if (segments.length > 1) {
            return segments.pop().toLowerCase();
        }
        return null;
    };

    return (
        <div>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', height: '100%' } }}
                maxWidth="xl"
                open={pdfOpen}
            >
                <DialogTitle style={{ background: '#002D68', color: 'white' }}>File Data View</DialogTitle>
                <DialogContent>
                    {fileExtension === 'pdf' ? (

                        <div className="pdf-container">
                            <object style={{ height: '80vh', width: '90vw' }} data={`http://192.168.0.247:8000/${fileTypeForView}`} type="application/pdf">
                                {/* Optional fallback content in case the browser doesn't support the object tag */}
                                <p>It appears you don't have a PDF plugin for this browser.
                                    No biggie... you can <a href={`http://192.168.0.247:8000/${fileTypeForView}`} target="_blank" rel="noopener noreferrer">click here to
                                        download the PDF file.</a></p>
                            </object>
                        </div>
                    ) : (
                        <img
                            srcSet={`http://192.168.0.247:8000/${fileTypeForView}`} style={{ height: '70vh', width: '75vw', margin: '20px' }}

                        />
                    )

                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PDFViewer;
