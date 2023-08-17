import React from 'react';

const Table = ({objCount, data, tableTitle}) => {
    return(
        <div>
            {(objCount === 1) ? (
                <div>
                    <div class='table'>
                        <h1>{tableTitle}</h1>
                        <div>
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data).map(([key, value]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    MORE THAN ONE OBJECT NEED TO CREATE MULTI OBJECT TABLE
                </div>
            )}
        </div>
    )
};

export default Table;