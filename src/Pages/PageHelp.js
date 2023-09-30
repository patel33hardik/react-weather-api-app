import React from 'react'

function PageHelp() {
    return (
        <div>
            <div class="container mt-5">
                <div className="row pb-3">
                    <h1 className="col-md-6"> Help Page </h1>
                </div>
                <h2>1. Access the Online Service:</h2>
                <ul>
                    <li>Visit <a href="/pass_remover" >Password Remover</a> using your web browser.</li>
                </ul>

                <h2>2. Upload Your File:</h2>
                <ul>
                    <li>Click the "Upload File" button on the website.</li>
                    <li>Select the password-protected Excel file from your local machine.</li>
                </ul>

                <h2>3. Automatic Download:</h2>
                <ul>
                    <li>After uploading, the service will process the file and remove the password protection.</li>
                    <li>Once the process is complete, a download link for the unprotected Excel file will be provided on the website.</li>
                    <li>Click the download link to retrieve your unprotected file.</li>
                </ul>

                <h2>Notes</h2>
                <ul>
                    <li>Make sure to keep your password-protected Excel file secure, as the script or service will require the password to remove the protection.</li>
                    <li>This script and online service are provided for legitimate and legal purposes only. Ensure you have the necessary rights to access and modify the Excel file.</li>
                </ul>

                <p>If you encounter any issues or have questions, please feel free to contact us.</p>
            </div>
        </div>
    )
}

export default PageHelp