import React, { useState } from 'react';

import './CompExcelFilePassRemover.css';

function CompExcelFilePassRemover() {
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [colorError, setErrorColor] = useState('red');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            if (!selectedFile.type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                setFileError('Invalid file format. Must be excel file with .xlsx');
                setErrorColor('red');
                setIsButtonDisabled(true);
            } else if (selectedFile.size > 5 * 1024 * 1024) {
                setErrorColor('red');
                setFileError('Make sure file size is less than 5 MB');
                setIsButtonDisabled(true);
            } else {
                setFileError('');
                setIsButtonDisabled(false);
            }
        } else {
            setIsButtonDisabled(true);
            setFileError('Please select at least one file.');
        }
    };

    const clean = () => {
        setFile('');
        const fileInput = document.getElementById('FileUploader');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    const displayValidMessage = (json_response) => {
        if (json_response) {
            setErrorColor('green');
            setFileError(json_response.Message);
            if (json_response.Result === 'ERROR') {
                setErrorColor('red');
                return false;
            }
            clean();
            return true;
        }
        setErrorColor('red');
        setFileError('Invalid json response');
    };

    const uploadFile = (file) => {
        const form_data = new FormData();
        form_data.append('file', file);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://patel33hardik.pythonanywhere.com/upload', true);
        xhr.onload = () => {
            setFileError('');
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.response);
                if (response) {
                    if (!displayValidMessage(response)) {
                        return;
                    }
                    const byteCharacters = atob(response.Binary);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray]);
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = response.FileName;
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(url);
                    displayValidMessage(response);
                    return;
                }
                displayValidMessage(response);
                return;
            } else if (xhr.status === 400) {
                displayValidMessage(JSON.parse(xhr.responseText));
                return;
            }
            setErrorColor('red');
            setFileError('File upload failed');
        }
        xhr.send(form_data);
    }

    const handleUpload = () => {
        if (file === "" || file === undefined) {
            setErrorColor('red');
            setFile('Please select a file before upload');
            return;
        }
        uploadFile(file);
        return;
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
                <button type="button" onClick={handleUpload} disabled={isButtonDisabled}> Upload </button>
                <span id="fileError" style={{ color: colorError }}> {fileError} </span>
                <br />
            </form>
        </div>
    );
}

export default CompExcelFilePassRemover;