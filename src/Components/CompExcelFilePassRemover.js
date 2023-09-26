import React, { useState } from 'react';

import './CompExcelFilePassRemover.css';

function CompExcelFilePassRemover() {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Reset file error message
        setFileError('');
    };

    const handleUpload = () => {
        if (!file) {
        setFileError('Please select a file to upload.');
        return;
        }

        // Perform the upload or processing here
        // You can make an API call to your Flask backend to handle the file

        // Reset the file input after upload (optional)
        setFile(null);
    };

    return (
        <div className='excel-pass-remover'>
            <div className="title">
                Excel file password remover
            </div>
            <form>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <p id="FileName">
                    {file ? `Selected File: ${file.name}` : 'Drag your files here or click in this area.'}
                </p>
                <br />
                <button type="button" onClick={handleUpload} disabled={!file}> Upload </button>
                <span id="fileError" style={{ color: 'red' }}> {fileError} </span>
                <br />
            </form>
        </div>
    );
}

export default CompExcelFilePassRemover;